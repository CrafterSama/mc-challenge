import * as yup from "yup";

export const ProductSchema = () =>
  yup.object({
    id: yup.string().notRequired(),
    phrase: yup.string().required("La Frase es obligatorio"),
    author: yup.string().required("Nombre del Autor es obligatorio"),
  });

export type ProductSchemaType = yup.InferType<ReturnType<typeof ProductSchema>>;
