import * as yup from "yup";

export const ProductSchema = () =>
  yup.object({
    name: yup.string().required("El Nombre es obligatorio"),
    description: yup.string().required("La Descripción es obligatorio"),
    price: yup.number().required("El Precio es obligatorio"),
    image_url: yup.string().required("La Imagen es obligatorio"),
    quantity: yup.number().required("La Cantidad es obligatorio"),
  });

export type ProductSchemaType = yup.InferType<ReturnType<typeof ProductSchema>>;
