
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ProductSearchBar from "./ProductSearchBar";
import ProductsTable from "./ProductsTable";
import ProductsPagination from "./ProductsPagination";
import AddProductDialog from "./AddProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";

// Define a product type that matches the database schema
type ProductFromDB = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  featured: boolean;
  category: string | null;
  created_at: string;
};

type ProductImage = {
  id: string;
  url: string;
  is_primary: boolean;
};

const AdminProducts = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: async (): Promise<(ProductFromDB & { images?: ProductImage[] })[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
      
      // Fetch images for all products
      const productsWithImages = await Promise.all(data.map(async (product) => {
        const { data: images, error: imageError } = await supabase
          .from("product_images")
          .select("*")
          .eq("product_id", product.id)
          .order("is_primary", { ascending: false });
          
        if (imageError) {
          console.error(`Error fetching images for product ${product.id}:`, imageError);
          return { ...product, images: [] };
        }
        
        return { ...product, images };
      }));
      
      return productsWithImages || [];
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (productId: string) => {
      // First delete any associated product images
      const { error: imageDeleteError } = await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId);
        
      if (imageDeleteError) {
        throw imageDeleteError;
      }
      
      // Then delete the product itself
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
      
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
      toast.success("Product deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  });

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
  };
  
  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct.mutate(productToDelete);
      setProductToDelete(null);
    }
  };

  // Filter products based on search query
  const filteredProducts = products?.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Products</CardTitle>
        <AddProductDialog isOpen={isAddDialogOpen} setIsOpen={setIsAddDialogOpen} />
      </CardHeader>
      <CardContent>
        <ProductSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="space-y-4">
          {filteredProducts.length === 0 && products && products.length > 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No products match your search</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">No products found</p>
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Product
              </Button>
            </div>
          ) : (
            <ProductsTable 
              products={currentProducts} 
              onDeleteProduct={handleDeleteProduct} 
            />
          )}

          <ProductsPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange}
          />
        </div>
      </CardContent>
      
      <DeleteProductDialog 
        productId={productToDelete} 
        setProductId={setProductToDelete}
        onConfirmDelete={confirmDelete}
      />
    </Card>
  );
};

export default AdminProducts;
