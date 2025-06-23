import { useState } from "react";

import { AvatarIcon, Flex, For, SimpleGrid } from "@chakra-ui/react";

import { EmptyState } from "@/components/ui/empty-state";
import { Product } from "@/types/product";
import ProductDeleteDialog from "./product-delete-dialog";
import ProductCard from "./products-card";

type ProductGridProps = {
  paginatedProducts: Product[];
  handleDeleteProduct: (id: number | string) => void;
};

const ProductGrid = ({
  paginatedProducts,
  handleDeleteProduct,
}: ProductGridProps) => {
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | {}>({
    name: "",
    description: "",
    image_url: "",
    quantity: 0,
    price: 0,
    is_back: false,
  });

  const handleOpenDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsOpenDeleteProduct(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedProduct({
      id: "",
      phrase: "",
      author: "",
    });
    setIsOpenDeleteProduct(false);
  };

  const onHandleDeleteProduct = () => {
    handleDeleteProduct(selectedProduct.id);
    handleCloseDeleteModal();
  };

  return (
    <>
      <ProductDeleteDialog
        isOpenDeleteProduct={isOpenDeleteProduct}
        setIsOpenDeleteProduct={setIsOpenDeleteProduct}
        handleCloseDeleteModal={handleCloseDeleteModal}
        onHandleDeleteProduct={onHandleDeleteProduct}
      />
      <Flex
        direction="row"
        gap="4"
        flex={1}
        w="full"
        wrap="wrap"
        paddingTop={8}
        paddingBottom={8}
        padding={6}
        minHeight={500}
        border="1"
        borderColor="gray.400"
        shadow="sm"
        background={"white"}
      >
        {paginatedProducts?.length >= 1 ? (
          <SimpleGrid
            columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}
            gap="2rem"
            grid="initial"
            justifyContent="center"
            width="full"
          >
            <For each={paginatedProducts}>
              {(product: Product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleOpenDeleteProduct={handleOpenDeleteProduct}
                />
              )}
            </For>
          </SimpleGrid>
        ) : (
          <Flex width="full" justifyContent="center" alignItems="center">
            <EmptyState
              icon={<AvatarIcon />}
              title="No hay datos disponibles"
            />
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ProductGrid;
