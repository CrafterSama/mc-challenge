"use client";

import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { LuPlus } from "react-icons/lu";

type ProductGridHeaderActionsProps = {
  handleSearch: (value: string) => void;
  onCreateProduct?: () => void;
};
const ProductGridHeaderActions = ({
  handleSearch,
  onCreateProduct,
}: ProductGridHeaderActionsProps) => {
  const pathname = usePathname();

  return (
    <Flex
      w="full"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding="2"
      paddingTop="3"
      paddingBottom="3"
      border={1}
      borderColor="gray.400"
      shadow="sm"
      background="#fff"
    >
      <Input
        placeholder="Buscar Productos"
        onKeyUp={(e) => handleSearch(e.currentTarget.value as string)}
        width={{ base: "full", md: "xs" }}
        borderRadius="lg"
      />
      {pathname.includes("/products") && (
        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          justifyContent="start"
          gap="2"
        >
          <Button
            onClick={onCreateProduct}
            variant="solid"
            background="green.500"
            borderRadius="lg"
          >
            <Text fontSize="sm" fontWeight="semibold">
              Nuevo Producto
            </Text>
            <LuPlus />
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default ProductGridHeaderActions;
