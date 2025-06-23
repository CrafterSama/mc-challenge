import { Product } from "@/types/product";
import { Box, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { LuShoppingCart } from "react-icons/lu";

const ProductCard = ({
  product,
  handleOpenDeleteProduct,
}: {
  product: Product;
  handleOpenDeleteProduct?: (product: Product) => void;
}) => {
  const [error, setError] = useState<boolean>(false);

  const handleAddToShopCart = (product: Product) => {
    console.log("product", product);
  };

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
      height="400px"
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
        <Stack
          className="overflow-hidden"
          direction="column"
          justifyContent="space-between"
          w="full"
          h="200px"
          position="relative
          "
        >
          <Image
            onError={() => setError(true)}
            src={error ? "/mc-logo.png" : product.imageUrl}
            alt="product"
            layout="fill"
            objectFit="cover"
          />
        </Stack>
        <IconButton
          aria-label="Delete Phrase"
          onClick={() => handleAddToShopCart(product)}
          borderRadius="lg"
          background="blue.400"
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
          <LuShoppingCart />
        </IconButton>
        <Text fontSize="lg" fontWeight="semibold" textAlign="start">
          {product.name}
        </Text>
        <Text fontSize="sm" textAlign="end" justifySelf="flex-end">
          {product.description}
        </Text>
        <Text fontSize="lg" textAlign="end" justifySelf="flex-end">
          {`${product.price} €`}
        </Text>
      </Flex>
    </Box>
  );
};

export default ProductCard;
