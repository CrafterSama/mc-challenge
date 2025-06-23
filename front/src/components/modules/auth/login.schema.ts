import * as yup from 'yup';

export const LogInSchema = () =>
  yup.object().shape({
    username: yup
      .string()
      .required('El usuario es requerido'),
    password: yup.string().required('La contraseña es requerida'),
  });

export type LogInSchemaType = yup.InferType<ReturnType<typeof LogInSchema>>;
