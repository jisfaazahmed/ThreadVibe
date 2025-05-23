
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(6);

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
      return productsData.map((product) => {
        // Get images for this product
        const productImages = imagesData.filter(
          (img) => img.product_id === product.id
        );
        
        // Get variants for this product
        const productVariants = variantsData.filter(
          (variant) => variant.product_id === product.id
        );
        
        // Extract unique colors
        const uniqueColors = Array.from(
          new Set(productVariants.map((v) => v.color))
        ).map(colorName => {
          const variant = productVariants.find(v => v.color === colorName);
          return {
            name: colorName,
            hex: variant?.color_hex || '#000000'
          };
        });
        
        // Extract unique sizes
        const uniqueSizes = Array.from(
          new Set(productVariants.map((v) => v.size))
        );

        return {
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: product.price,
          stock: product.stock,
          featured: product.featured || false,
          category: product.category || "Uncategorized",
          images: productImages.map((img) => img.url),
          colors: uniqueColors,
          sizes: uniqueSizes,
          tags: product.category ? [product.category] : []
        };
      });
    }
  });

  return (
    <MainLayout>
      <HeroSection />
      <FeaturedProducts products={products || []} isLoading={isLoading} />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </MainLayout>
  );
};

export default Index;
