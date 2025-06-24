import { API_URL } from "@/constants/common";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { removeSessionFromCookies } from "./auth-cookie";

export class ApiClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.setupResponseInterceptor();
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.request(
        config
      );
      return response.data;
    } catch (error: Error | any) {
      const status = error.response?.status;
      throw new Error(status);
    }
  }

  private setupResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Verificar si el error es 403 y no es una solicitud de refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Si ya se está refrescando el token, esperar a que termine
            return new Promise((resolve) => {
              this.refreshSubscribers.push((token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                resolve(this.axiosInstance(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Realizar el refresh del token (ajusta esta llamada según tu API)
            const refreshResponse = await axios.post(
              `${API_URL}/api/token/refresh/`,
              {},
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );
            const newToken = refreshResponse.data.accessToken;

            // Actualizar el token en las solicitudes futuras
            this.axiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;

            // Reintentar la solicitud original con el nuevo token
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            this.processSubscribers(newToken);

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            removeSessionFromCookies();
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private processSubscribers(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ ...config, method: "POST", url, data });
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.request<T>({ ...config, method: "PUT", url, data });
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE", url });
  }
}

export const api = new ApiClient();
