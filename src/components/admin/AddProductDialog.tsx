
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ProductForm from "./ProductForm";
import { useQueryClient } from "@tanstack/react-query";

interface AddProductDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new product to the store.
          </DialogDescription>
        </DialogHeader>
        <ProductForm 
          onSuccess={() => {
            setIsOpen(false);
            queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
          }} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
