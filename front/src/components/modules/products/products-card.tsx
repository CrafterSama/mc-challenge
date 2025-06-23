import { Product } from "@/types/product";
import { Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";

const ProductCard = ({
  product,
  handleOpenDeleteProduct,
}: {
  product: Product;
  handleOpenDeleteProduct: (product: Product) => void;
}) => {
  return (
    <Box
      width={{
        base: "full",
        sm: "w-1/2",
        md: "w-1/3",
        lg: "w-1/4",
        xl: "w-1/5",
      }}
      minW={{
        base: "full",
        xl: "230px",
      }}
      padding="1rem"
      height="200px"
      borderRadius="lg"
      shadow="md"
      position="relative"
    >
      <Flex
        direction="column"
        justifyContent="space-between"
        w="full"
        h="full"
        className="group overflow-hidden"
      >
        <IconButton
          aria-label="Delete Phrase"
          onClick={() => handleOpenDeleteProduct(product)}
          borderRadius="lg"
          background="red.400"
          size="xs"
          width={8}
          position="absolute"
          top="-.35rem"
          right="-.35rem"
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
        >
          <LuTrash />
        </IconButton>
        <Stack
          className="overflow-hidden"
          direction="column"
          justifyContent="space-between"
          w="full"
          h="full"
        >
          <Text
            fontSize="lg"
            fontFamily="serif"
            fontStyle="italic"
            fontWeight="semibold"
            textAlign="start"
          >
            {product.name}
          </Text>
        </Stack>
        <Text
          fontSize="sm"
          fontFamily="serif"
          fontStyle="italic"
          textAlign="end"
          justifySelf="flex-end"
        >
          {product.description}
        </Text>
      </Flex>
    </Box>
  );
};

export default ProductCard;
