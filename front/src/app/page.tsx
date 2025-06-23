"use client";

import { useState } from "react";

import ProductGrid from "@/components/modules/products/product-grid";
import ProductGridHeader from "@/components/modules/products/product-grid-header";
import ProductGridHeaderActions from "@/components/modules/products/product-grid-header-actions";
import { useGetProducts } from "@/hooks/api/use-products";
import { Product } from "@/types/product";
import { Flex } from "@chakra-ui/react";

const ProductsPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data: products }: any = useGetProducts(search);

  const handleSearch = (value: string) => {
    //
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="full"
      h="screen"
      padding={{ base: "4", md: "8" }}
    >
      <ProductGridHeader />

      <ProductGridHeaderActions handleSearch={handleSearch} />

      <ProductGrid products={products as Product[]} />
    </Flex>
  );
};

export default ProductsPage;
