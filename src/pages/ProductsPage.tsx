
import React, { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductGrid from "@/components/products/ProductGrid";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type ProductColor = {
  name: string;
  hex: string;
};

type DbProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  featured: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
};

type ProductImage = {
  id: string;
  url: string;
  alt_text: string | null;
  is_primary: boolean | null;
  product_id: string;
};

type ProductVariant = {
  id: string;
  color: string;
  color_hex: string | null;
  size: string;
  stock: number;
  product_id: string;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  featured: boolean;
  category: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  tags: string[];
};

const ProductsPage = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*");

      if (productsError) {
        console.error("Error fetching products:", productsError);
        throw productsError;
      }

      // Fetch all product images
      const { data: imagesData, error: imagesError } = await supabase
        .from("product_images")
        .select("*");

      if (imagesError) {
        console.error("Error fetching product images:", imagesError);
        throw imagesError;
      }

      // Fetch all product variants
      const { data: variantsData, error: variantsError } = await supabase
        .from("product_variants")
        .select("*");

      if (variantsError) {
        console.error("Error fetching product variants:", variantsError);
        throw variantsError;
      }

      // Map data to our Product type
      return productsData.map((product: DbProduct) => {
        // Get images for this product
        const productImages = imagesData.filter(
          (img: ProductImage) => img.product_id === product.id
        );
        
        // Get variants for this product
        const productVariants = variantsData.filter(
          (variant: ProductVariant) => variant.product_id === product.id
        );
        
        // Extract unique colors
        const uniqueColors = Array.from(
          new Set(productVariants.map((v: ProductVariant) => v.color))
        ).map(colorName => {
          const variant = productVariants.find(v => v.color === colorName);
          return {
            name: colorName,
            hex: variant?.color_hex || '#000000'
          };
        });
        
        // Extract unique sizes
        const uniqueSizes = Array.from(
          new Set(productVariants.map((v: ProductVariant) => v.size))
        );

        return {
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: product.price,
          stock: product.stock,
          featured: product.featured || false,
          category: product.category || "Uncategorized",
          images: productImages.map((img: ProductImage) => img.url),
          colors: uniqueColors,
          sizes: uniqueSizes,
          tags: product.category ? [product.category] : []
        };
      });
    }
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load products");
    }
  }, [error]);

  return (
    <MainLayout>
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
        </div>
      ) : (
        <ProductGrid products={products || []} title="All Products" />
      )}
    </MainLayout>
  );
};

export default ProductsPage;
