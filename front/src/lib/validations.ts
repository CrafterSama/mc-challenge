import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.number().min(0.01, "El precio debe ser mayor a 0"),
  stock: z.number().int().min(0, "El stock no puede ser negativo"),
  image: z.string().url("URL de imagen inválida"),
  category: z.string().min(1, "La categoría es requerida"),
});

export const checkoutSchema = z.object({
  // Shipping Address
  shippingAddress: z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    street: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
    city: z.string().min(2, "La ciudad debe tener al menos 2 caracteres"),
    postalCode: z
      .string()
      .min(5, "El código postal debe tener al menos 5 caracteres"),
    country: z.string().min(2, "El país es requerido"),
    phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
  }),
  // Payment Information
  paymentMethod: z.enum(["card", "paypal", "transfer"], {
    required_error: "Selecciona un método de pago",
  }),
  cardInfo: z
    .object({
      cardNumber: z.string().min(16, "Número de tarjeta inválido"),
      expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato MM/YY"),
      cvv: z
        .string()
        .min(3, "CVV debe tener 3 dígitos")
        .max(4, "CVV debe tener máximo 4 dígitos"),
      cardName: z.string().min(2, "Nombre en la tarjeta es requerido"),
    })
    .optional(),
  // Additional Options
  saveAddress: z.boolean().default(false),
  newsletter: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
