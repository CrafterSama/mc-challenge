"use client";

import { useEffect, useState } from "react";

import ProductFormDialog from "@/components/modules/products/product-form-dialog";
import ProductGrid from "@/components/modules/products/product-grid";
import ProductGridHeader from "@/components/modules/products/product-grid-header";
import ProductGridHeaderActions from "@/components/modules/products/product-grid-header-actions";
import Pagination from "@/components/ui/template/pagination";
import { toaster } from "@/components/ui/toaster";
import { useProducts } from "@/hooks/api/use-products";
import { Product } from "@/types/product";
import { getSession } from "@/utils/auth-cookie";
import { Flex } from "@chakra-ui/react";

const ProductsPage = () => {
  const session = getSession();
  console.log("session", session);
  const { data: products } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpenProductForm, setIsOpenProductForm] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    products || []
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products?.length / itemsPerPage);
  const paginatedProducts: Product[] = []?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (value: string) => {
    //
  };

  const handleCreateProduct = () => {
    setIsOpenProductForm(true);
  };

  const handleCloseProductForm = () => {
    setIsOpenProductForm(false);
  };

  const handleDeleteProduct = (id: number | string) => {
    //deleteProduct(id);
    setCurrentPage(1);
    toaster.create({
      title: "Success",
      description: "Frase eliminada exitosamente",
      type: "success",
    });
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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
        setFilteredProducts={setFilteredProducts}
        setCurrentPage={setCurrentPage}
      />

      <ProductGridHeader />

      <ProductGridHeaderActions
        handleSearch={handleSearch}
        onCreateProduct={handleCreateProduct}
      />

      <ProductGrid
        paginatedProducts={paginatedProducts || []}
        handleDeleteProduct={handleDeleteProduct}
      />
      <Pagination
        data={paginatedProducts || []}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </Flex>
  );
};

export default ProductsPage;
