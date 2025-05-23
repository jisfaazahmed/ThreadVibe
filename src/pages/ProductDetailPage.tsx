
import React from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProductDetail from "@/components/products/ProductDetail";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

type ProductColor = {
  name: string;
  hex: string;
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

// Review type definition for our database
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

type ProductReview = {
  id: string;
  title: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  productId: string;
};

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: async (): Promise<Product | null> => {
      if (!id) return null;

      try {
        // Fetch the product
        const { data: productData, error: productError } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (productError) {
          console.error("Error fetching product:", productError);
          toast.error("Failed to load product details");
          return null;
        }

        if (!productData) {
          toast.error("Product not found");
          return null;
        }

        // Fetch product images
        const { data: imagesData, error: imagesError } = await supabase
          .from("product_images")
          .select("*")
          .eq("product_id", id);

        if (imagesError) {
          console.error("Error fetching product images:", imagesError);
        }

        // Fetch product variants
        const { data: variantsData, error: variantsError } = await supabase
          .from("product_variants")
          .select("*")
          .eq("product_id", id);

        if (variantsError) {
          console.error("Error fetching product variants:", variantsError);
        }

        // Extract unique colors from variants
        const uniqueColors = Array.from(
          new Set((variantsData || []).map((variant: ProductVariant) => variant.color))
        ).map(colorName => {
          const variant = (variantsData || []).find((v: ProductVariant) => v.color === colorName);
          return {
            name: colorName,
            hex: variant?.color_hex || '#000000'
          };
        });
        
        // Extract unique sizes from variants
        const uniqueSizes = Array.from(
          new Set((variantsData || []).map((variant: ProductVariant) => variant.size))
        );

        // Map data to our Product type
        return {
          id: productData.id,
          name: productData.name,
          description: productData.description || "",
          price: productData.price,
          stock: productData.stock,
          featured: productData.featured || false,
          category: productData.category || "Uncategorized",
          images: (imagesData || []).map((img: ProductImage) => img.url),
          colors: uniqueColors,
          sizes: uniqueSizes,
          tags: productData.category ? [productData.category] : []
        };
      } catch (err) {
        console.error("Unexpected error fetching product:", err);
        toast.error("Something went wrong while loading the product");
        return null;
      }
    }
  });

  // Hardcoded reviews data for now
  const productReviews: ProductReview[] = [
    {
      id: "1",
      title: "Great product!",
      rating: 5,
      comment: "This is an amazing product. I love it and would recommend it to anyone!",
      author: "John Doe",
      date: "2025-04-01",
      productId: id || ""
    },
    {
      id: "2",
      title: "Good quality",
      rating: 4,
      comment: "Good quality product, very comfortable and stylish.",
      author: "Jane Smith",
      date: "2025-03-25",
      productId: id || ""
    }
  ];

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or couldn't be loaded.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ProductDetail product={product} />
      
      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-10 border-t">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        
        {productReviews.length > 0 ? (
          <div className="space-y-6">
            {productReviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{review.title}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.585l-5.992 3.15 1.144-6.666L.298 7.38l6.684-.973L10 .5l3.018 5.908 6.684.973-4.854 4.688 1.144 6.666z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  By {review.author} on {new Date(review.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            <Button variant="outline" className="mt-4">
              Write a Review
            </Button>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default ProductDetailPage;
