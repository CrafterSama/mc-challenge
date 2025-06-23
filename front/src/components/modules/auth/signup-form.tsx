"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import useAppStoreContext from "@/state-management/users-app-global-state";
import {
  AuthResponse,
  AuthUser,
  SessionForCookies,
  SignupFormValues,
} from "@/types/common";
import { Button, Field, Input, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { SignupSchema } from "@/components/modules/auth/signup.schema";
import { useAuthSignup } from "@/hooks/api/use-auth";
import { getAuthUser } from "@/services/user";

const SignupForm = () => {
  const { auth } = useAppStoreContext();
  const { mutate: signup } = useAuthSignup();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: yupResolver(SignupSchema()),
  });

  const onSubmit = (data: SignupFormValues) => {
    signup(data, {
      onSuccess: async (data: any) => {
        const response = data as AuthResponse;
        if (data.access) {
          const user: AuthUser = await getAuthUser(response.access);
          const session: SessionForCookies = {
            user,
            token: response.access,
            refreshToken: response.refresh,
          };
          auth.login(session);
          toaster.create({
            title: "Success",
            description: "Iniciaste sesión de forma satisfactoria",
            type: "success",
          });
          router.push("/");
        }
      },
      onError: (error: any) => {
        toaster.create({
          title: "Error",
          description: error.details,
          type: "error",
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="8" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username}>
          <Input
            {...register("username")}
            placeholder="username"
            borderRadius="lg"
          />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.username}>
          <Input
            {...register("email")}
            placeholder="admin@example.com"
            borderRadius="lg"
          />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <PasswordInput
            {...register("password")}
            placeholder="password"
            borderRadius="lg"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.password}>
          <PasswordInput
            {...register("confirmPassword")}
            placeholder="confirmar password"
            borderRadius="lg"
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          role="button"
          name="login"
          type="submit"
          width="full"
          borderRadius="lg"
          background="blue.500"
          _hover={{
            bg: "blue.600",
          }}
          _active={{
            bg: "blue.400",
          }}
        >
          Signup
        </Button>
      </Stack>
      {/*<Text fontSize="sm" textAlign="center" color="gray.400" mt={4}>
        usuario: admin@example.com, password: password
      </Text>*/}
    </form>
  );
};

export default SignupForm;
