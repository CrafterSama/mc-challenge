import * as yup from "yup";

export const SignupSchema = () =>
  yup.object().shape({
    username: yup.string().required("El usuario es requerido"),
    email: yup.string().required("El email es requerido"),
    password: yup.string().required("La contraseña es requerida"),
    confirmPassword: yup
      .string()
      .required("La confirmación de contraseña es requerida")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
  });

export type SignupSchemaType = yup.InferType<ReturnType<typeof SignupSchema>>;
