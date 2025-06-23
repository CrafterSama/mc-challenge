import { Flex, Text } from "@chakra-ui/react";

const ProductListHeader = () => {
  return (
    <Flex
      w="full"
      direction={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
      gap="2"
      padding="4"
      borderBottom="1px"
      borderColor="gray.400"
      shadow="sm"
      borderTopRadius={{ base: "none", md: "md" }}
    >
      <Flex
        direction="column"
        justifyContent={{ base: "center", md: "start" }}
        gap="2"
      >
        <Text
          fontSize="2xl"
          fontWeight="semibold"
          textAlign={{ base: "center", md: "left" }}
        >
          Productos
        </Text>
        <Text
          fontSize="sm"
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          Crea, Busca/Filtra Productos
        </Text>
      </Flex>
    </Flex>
  );
};

export default ProductListHeader;
