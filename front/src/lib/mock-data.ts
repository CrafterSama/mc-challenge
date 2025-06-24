import type { Product, User } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Max 270",
    description:
      "Zapatillas deportivas con tecnología Air Max para máxima comodidad y estilo urbano.",
    price: 129.99,
    stock: 15,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Deportivos",
  },
  {
    id: "2",
    name: "Adidas Stan Smith",
    description:
      "Clásicas zapatillas blancas de cuero, perfectas para cualquier ocasión casual.",
    price: 89.99,
    stock: 8,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Casuales",
  },
  {
    id: "3",
    name: "Converse Chuck Taylor",
    description:
      "Icónicas zapatillas de lona alta, un clásico atemporal para tu guardarropa.",
    price: 65.99,
    stock: 12,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Casuales",
  },
  {
    id: "4",
    name: "Dr. Martens 1460",
    description:
      "Botas de cuero resistentes con suela AirWair, perfectas para cualquier clima.",
    price: 179.99,
    stock: 0, // Out of stock
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Botas",
  },
  {
    id: "5",
    name: "Vans Old Skool",
    description:
      "Zapatillas skate clásicas con la icónica raya lateral, comodidad y durabilidad.",
    price: 75.99,
    stock: 20,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Casuales",
  },
  {
    id: "6",
    name: "Timberland 6-Inch",
    description:
      "Botas impermeables de cuero premium, ideales para trabajo y aventuras al aire libre.",
    price: 199.99,
    stock: 4, // Low stock
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Botas",
  },
  {
    id: "7",
    name: "New Balance 574",
    description:
      "Zapatillas retro con tecnología ENCAP para soporte y durabilidad excepcionales.",
    price: 95.99,
    stock: 18,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Deportivos",
  },
  {
    id: "8",
    name: "Puma Suede Classic",
    description:
      "Zapatillas de ante suave con diseño vintage, un ícono del streetwear.",
    price: 79.99,
    stock: 14,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Casuales",
  },
  {
    id: "9",
    name: "Clarks Desert Boot",
    description:
      "Botines de ante con suela de crepé, elegancia casual para cualquier ocasión.",
    price: 139.99,
    stock: 9,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Formales",
  },
  {
    id: "10",
    name: "Birkenstock Arizona",
    description:
      "Sandalias ergonómicas con plantilla de corcho moldeado para máximo confort.",
    price: 89.99,
    stock: 16,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Sandalias",
  },
  {
    id: "11",
    name: "Reebok Classic Leather",
    description:
      "Zapatillas de cuero clásicas, simplicidad y comodidad en cada paso.",
    price: 85.99,
    stock: 3, // Low stock
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Casuales",
  },
  {
    id: "12",
    name: "Asics Gel-Kayano",
    description:
      "Zapatillas de running con tecnología GEL para amortiguación superior.",
    price: 159.99,
    stock: 7,
    imageUrl: "/placeholder.svg?height=400&width=400",
    category: "Deportivos",
  },
];

export const mockUsers: User[] = [
  {
    id: "admin-1",
    name: "Admin Usuario",
    email: "admin@shoesstore.com",
    role: "admin",
  },
  {
    id: "user-1",
    name: "Usuario Regular",
    email: "user@example.com",
    role: "user",
  },
];
