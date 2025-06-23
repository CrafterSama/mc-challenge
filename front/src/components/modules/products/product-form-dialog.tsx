import ProductForm from "@/components/modules/products/product-form";
import Dialog from "@/components/ui/dialog";

type ProductFormDialogProps = {
  isOpenProductForm: boolean;
  handleCloseProductForm: () => void;
  setFilteredProducts: (products: any[]) => void;
  setCurrentPage: (page: number) => void;
};

const ProductFormDialog = ({
  isOpenProductForm,
  handleCloseProductForm,
  setFilteredProducts,
  setCurrentPage,
}: ProductFormDialogProps) => {
  return (
    <Dialog
      open={isOpenProductForm}
      onOpenChange={() => handleCloseProductForm()}
      title="Guardar frase"
    >
      <ProductForm
        onCancel={handleCloseProductForm}
        updateData={setFilteredProducts}
        updatePage={setCurrentPage}
      />
    </Dialog>
  );
};

export default ProductFormDialog;
