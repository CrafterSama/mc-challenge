import Dialog from "@/components/ui/dialog";
import { Button, Flex, Text } from "@chakra-ui/react";

type ProductDeleteDialogProps = {
  isOpenDeleteProduct: boolean;
  setIsOpenDeleteProduct: (isOpenDeleteProduct: boolean) => void;
  handleCloseDeleteModal: () => void;
  onHandleDeleteProduct: () => void;
};

const ProductDeleteDialog = ({
  isOpenDeleteProduct,
  setIsOpenDeleteProduct,
  handleCloseDeleteModal,
  onHandleDeleteProduct,
}: ProductDeleteDialogProps) => {
  return (
    <Dialog
      open={isOpenDeleteProduct}
      onOpenChange={() => setIsOpenDeleteProduct(false)}
      title="Eliminar frase"
    >
      <Text fontSize="sm" textAlign="center">
        ¿Está seguro de que desea eliminar esta frase?
      </Text>
      <Flex
        direction="row"
        gap="4"
        width="full"
        justifyContent="flex-end"
        position="relative"
        wrap="wrap"
        marginTop="4"
      >
        <Button
          variant="outline"
          borderRadius="lg"
          borderColor="blue.500"
          color="blue.500"
          type="button"
          width="w-1/2"
          onClick={handleCloseDeleteModal}
        >
          Cancelar
        </Button>
        <Button
          onClick={onHandleDeleteProduct}
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
          Eliminar
        </Button>
      </Flex>
    </Dialog>
  );
};

export default ProductDeleteDialog;
