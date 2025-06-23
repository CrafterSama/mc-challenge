import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { toaster } from "@/components/ui/toaster";
import useAppStoreContext from "@/state-management/users-app-global-state";
import { Product as ProductFormProps } from "@/types/product";
import { Button, Field, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { ProductSchema } from "./product-form.schema";

const ProductForm = ({
  onCancel,
  updateData,
  updatePage,
}: {
  onCancel: () => void;
  updateData: (product: ProductFormProps[]) => void;
  updatePage: (page: number) => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProductSchema()),
  });
  const { products, addProduct } = useAppStoreContext();

  const onSubmit = (data: ProductFormProps) => {
    const product = {
      id: Math.floor(Math.random() * 1000),
      phrase: data.phrase,
      author: data.author,
    };
    addProduct(product);
    toaster.create({
      title: "Success",
      description: "Frase creada exitosamente",
      type: "success",
    });
    onCancel();
  };

  const phraseWatched = watch("phrase");

  const handleKeyUp = (value: string) => {
    if (value.length >= 71) {
      return setValue("phrase", value.slice(0, 70));
    }
    return setValue("phrase", value);
  };

  useEffect(() => {
    updateData(products);
    updatePage(1);
  }, [products]);

  return (
    <Flex w="full" direction="column" gap="4" mt="4">
      <form onSubmit={handleSubmit(onSubmit as any)} style={{ width: "100%" }}>
        <Stack w="full" gap="4">
          <Field.Root invalid={!!errors.phrase}>
            <Field.Label>Frase</Field.Label>
            <Textarea
              {...register("phrase")}
              rows={4}
              onKeyUp={(e) => handleKeyUp(e.currentTarget.value)}
              borderRadius="lg"
              placeholder="Frase"
            />
            <Flex direction="row" justifyContent="space-between" w="full">
              <Field.ErrorText alignSelf="start" fontSize={12}>
                {errors.phrase?.message}
              </Field.ErrorText>
              <Field.HelperText
                color="gray.400"
                textAlign="end"
                justifySelf="flex-end"
                fontSize={12}
              >{`${phraseWatched?.length}/70 Caracteres`}</Field.HelperText>
            </Flex>
          </Field.Root>
          <Field.Root invalid={!!errors.author}>
            <Field.Label>Autor</Field.Label>
            <Input
              {...register("author")}
              borderRadius="lg"
              placeholder="Autor"
            />
            <Field.ErrorText>{errors.author?.message}</Field.ErrorText>
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
