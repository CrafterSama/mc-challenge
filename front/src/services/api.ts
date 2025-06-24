import { API_BASE_URL } from "@/constants";
import type { Order, Product, User } from "@/types";

class ApiService {
  private baseURL = API_BASE_URL;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem("auth-storage");

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>("/products/");
  }

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    return this.request<Product>("/products/", {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  // Orders
  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>("/orders/");
  }

  async createOrder(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
    return this.request<Order>("/orders/", {
      method: "POST",
      body: JSON.stringify(order),
    });
  }

  // Auth
  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>("/auth/register/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }
}

export const apiService = new ApiService();
