"use client";

import { useState } from "react";

import ProductFormDialog from "@/components/modules/products/product-form-dialog";
import ProductGrid from "@/components/modules/products/product-grid";
import ProductGridHeader from "@/components/modules/products/product-grid-header";
import ProductGridHeaderActions from "@/components/modules/products/product-grid-header-actions";
import { useGetProducts } from "@/hooks/api/use-products";
import { Product } from "@/types/product";
import { Flex } from "@chakra-ui/react";

const ProductsPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data: products } = useGetProducts(search);
  const [isOpenProductForm, setIsOpenProductForm] = useState(false);

  const handleSearch = (value: string) => {
    //
  };

  const handleCreateProduct = () => {
    setIsOpenProductForm(true);
  };

  const handleCloseProductForm = () => {
    setIsOpenProductForm(false);
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
      <ProductFormDialog
        isOpenProductForm={isOpenProductForm}
        handleCloseProductForm={handleCloseProductForm}
        /*setFilteredProducts={setFilteredProducts}
        setCurrentPage={setCurrentPage}*/
      />

      <ProductGridHeader />

      <ProductGridHeaderActions
        handleSearch={handleSearch}
        onCreateProduct={handleCreateProduct}
      />

      <ProductGrid products={products as Product[]} />
      {/*<Pagination
        data={paginatedProducts || []}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />*/}
    </Flex>
  );
};

export default ProductsPage;
