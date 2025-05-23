
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Image } from "lucide-react";
import ProductForm from "./ProductForm";
import { useQueryClient } from "@tanstack/react-query";

type ProductImage = {
  id: string;
  url: string;
  is_primary: boolean;
};

type ProductFromDB = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  featured: boolean;
  category: string | null;
  created_at: string;
  images?: ProductImage[];
};

interface ProductsTableProps {
  products: (ProductFromDB & { images?: ProductImage[] })[];
  onDeleteProduct: (productId: string) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, onDeleteProduct }) => {
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = React.useState<ProductFromDB | null>(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">No products match your search</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Images</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-muted/50">
              <td className="p-2">{product.name}</td>
              <td className="p-2">LKR {product.price.toFixed(2)}</td>
              <td className="p-2">
                <span className={product.stock <= 5 ? "text-red-600 font-medium" : ""}>
                  {product.stock}
                </span>
              </td>
              <td className="p-2">{product.category || "—"}</td>
              <td className="p-2">
                {product.images && product.images.length > 0 ? (
                  <div className="flex gap-1 items-center">
                    <div className="h-8 w-8 rounded bg-gray-100 overflow-hidden">
                      <img 
                        src={product.images[0].url} 
                        alt={product.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    {product.images.length > 1 && (
                      <span className="text-xs text-gray-500">+{product.images.length - 1}</span>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-400 flex items-center">
                    <Image size={14} className="mr-1" /> None
                  </span>
                )}
              </td>
              <td className="p-2 text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingProduct(product)}
                    >
                      <Edit size={16} />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>
                        Update the product information below.
                      </DialogDescription>
                    </DialogHeader>
                    {editingProduct && (
                      <ProductForm 
                        productId={editingProduct.id}
                        productData={editingProduct}
                        onSuccess={() => {
                          setEditingProduct(null);
                          queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
                        }} 
                      />
                    )}
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
