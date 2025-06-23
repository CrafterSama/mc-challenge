import { AuthUser } from "@/types/common";

export interface Product {
  id?: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  isBack?: boolean;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface Order {
  id: string | number;
  user: AuthUser;
  createdAt: string;
  products: Product[];
}
