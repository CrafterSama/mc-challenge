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
}: ProductFormDialogProps) => {
  return (
    <Dialog
      open={isOpenProductForm}
      onOpenChange={() => handleCloseProductForm()}
      title="Crear Producto"
    >
      <ProductForm onCancel={handleCloseProductForm} />
    </Dialog>
  );
};

export default ProductFormDialog;
