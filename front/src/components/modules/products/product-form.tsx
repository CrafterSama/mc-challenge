import { useForm } from "react-hook-form";

import { toaster } from "@/components/ui/toaster";
import { Product as ProductFormProps } from "@/types/product";
import { Button, Field, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateProducts } from "@/hooks/api/use-products";
import { ProductSchema } from "./product-form.schema";

const ProductForm = ({ onCancel }: { onCancel: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductSchema()),
  });
  const { mutate: addProduct } = useCreateProducts();

  const onSubmit = (data: ProductFormProps) => {
    const product = {
      name: data.name,
      description: data.description,
      price: data.price,
      image_url: data.image_url,
      quantity: data.quantity,
    };
    addProduct(product, {
      onSuccess: () => {
        toaster.create({
          title: "Success",
          description: "Producto creado exitosamente",
          type: "success",
        });
      },
      onError: (error: any) => {
        toaster.create({
          title: "Error",
          description: error.details,
          type: "error",
        });
      },
      onSettled: () => {
        onCancel();
      },
    });
  };

  const descriptionWatched = watch("name");

  const handleKeyUp = (value: string) => {
    if (value.length >= 71) {
      return setValue("name", value.slice(0, 70));
    }
    return setValue("name", value);
  };

  return (
    <Flex w="full" direction="column" gap="4" mt="4">
      <form onSubmit={handleSubmit(onSubmit as any)} style={{ width: "100%" }}>
        <Stack w="full" gap="4">
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Nombre</Field.Label>
            <Input
              {...register("name")}
              borderRadius="lg"
              placeholder="Nombre"
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.description}>
            <Field.Label>Descripción</Field.Label>
            <Textarea
              {...register("description")}
              rows={4}
              onKeyUp={(e) => handleKeyUp(e.currentTarget.value)}
              borderRadius="lg"
              placeholder="Descripción"
            />
            <Flex direction="row" justifyContent="space-between" w="full">
              <Field.ErrorText alignSelf="start" fontSize={12}>
                {errors.description?.message}
              </Field.ErrorText>
              <Field.HelperText
                color="gray.400"
                textAlign="end"
                justifySelf="flex-end"
                fontSize={12}
              >{`${descriptionWatched?.length}/70 Caracteres`}</Field.HelperText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.image_url}>
            <Field.Label>URL de la Imagen</Field.Label>
            <Input
              {...register("image_url")}
              borderRadius="lg"
              placeholder="URL Imagen"
            />
            <Field.ErrorText>{errors.image_url?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.price}>
            <Field.Label>Precio</Field.Label>
            <Input
              {...register("price")}
              type="number"
              borderRadius="lg"
              placeholder="Precio"
            />
            <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.quantity}>
            <Field.Label>Precio</Field.Label>
            <Input
              {...register("quantity")}
              type="number"
              borderRadius="lg"
              placeholder="Cantidad"
            />
            <Field.ErrorText>{errors.quantity?.message}</Field.ErrorText>
          </Field.Root>
          <Flex
            direction="row"
            gap="4"
            width="full"
            justifyContent="flex-end"
            position="relative"
            wrap="wrap"
          >
            <Button
              variant="outline"
              borderRadius="lg"
              borderColor="blue.500"
              color="blue.500"
              type="button"
              width="w-1/2"
              onClick={onCancel}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              width="full"
              w="w-1/2"
              borderRadius="lg"
              background="blue.500"
              _hover={{
                bg: "blue.600",
              }}
              _active={{
                bg: "blue.400",
              }}
            >
              Guardar
            </Button>
          </Flex>
        </Stack>
      </form>
    </Flex>
  );
};

export default ProductForm;
