
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Process the image URL to handle Supabase Storage paths
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) return "https://placehold.co/600x600/CCCCCC/333333?text=No+Image";
    
    if (!imageUrl.startsWith('http')) {
      return `https://slqmtywrcktxkiqqldnu.supabase.co/storage/v1/object/public/${imageUrl}`;
    }
    
    return imageUrl;
  };

  const imageUrl = product.images && product.images.length > 0 
    ? getImageUrl(product.images[0]) 
    : "https://placehold.co/600x600/CCCCCC/333333?text=No+Image";

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-all duration-300">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover product-card-transition hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = "https://placehold.co/600x600/CCCCCC/333333?text=Image+Error";
            }}
          />
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-brand-purple">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-lg mb-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-bold">LKR {product.price.toFixed(2)}</span>
            <div className="flex space-x-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
