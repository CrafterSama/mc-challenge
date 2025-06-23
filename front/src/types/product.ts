import { AuthUser } from "@/types/common";

export interface Product {
  id: string | number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  quantity: number;
  is_back: boolean;
}

export interface Order {
  id: string | number;
  user: AuthUser;
  created_at: string;
  products: Product[];
}
