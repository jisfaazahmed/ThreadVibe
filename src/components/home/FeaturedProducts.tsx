
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import ProductCard from "../products/ProductCard";
import { Button } from "@/components/ui/button";

interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products, isLoading }) => {
  // If loading, show skeleton loaders
  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <p className="text-gray-600 mt-2">Discover our most popular designs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="aspect-square bg-gray-200 animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-200 animate-pulse w-3/4 mb-2"></div>
                <div className="h-5 bg-gray-200 animate-pulse w-1/4"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-gray-400 px-8"
              asChild
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  // If no featured products, show a message or some placeholder
  if (products.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <p className="text-gray-600 mt-2">Check out our full catalog for great products</p>
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-gray-400 px-8"
              asChild
            >
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Featured Collection</h2>
          <p className="text-gray-600 mt-2">Discover our most popular designs</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-gray-400 px-8"
            asChild
          >
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
