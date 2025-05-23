
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductGallery from "./ProductGallery";
import { ShoppingCart } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  // Make sure we're setting safe default values, even if arrays are empty
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : { name: "", hex: "#000000" }
  );
  
  const [quantity, setQuantity] = useState(1);

  // Ensure product has images array with at least one item
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : ["https://placehold.co/600x600/CCCCCC/333333?text=Image+Not+Available"];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <ProductGallery images={productImages} name={product.name} />

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">LKR {product.price.toFixed(2)}</p>
          </div>
          
          <p className="text-gray-600">{product.description}</p>
          
          {/* Color Selection - Only show if colors are available */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">
                Color: {selectedColor ? selectedColor.name : ""}
              </h3>
              <RadioGroup 
                defaultValue={selectedColor ? selectedColor.name : ""}
                onValueChange={(value) => {
                  const color = product.colors.find(c => c.name === value);
                  if (color) setSelectedColor(color);
                }}
                className="flex items-center flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <div key={color.name} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={color.name}
                      id={`color-${color.name}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`color-${color.name}`}
                      className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center p-0.5 ${
                        selectedColor && selectedColor.name === color.name ? "border-2 border-brand-purple" : ""
                      }`}
                    >
                      <span
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {/* Size Selection - Only show if sizes are available */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Size</h3>
              <RadioGroup 
                defaultValue={selectedSize}
                onValueChange={setSelectedSize}
                className="flex items-center gap-3"
              >
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={size}
                      id={`size-${size}`}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className={`w-10 h-10 rounded border flex items-center justify-center cursor-pointer transition ${
                        selectedSize === size
                          ? "bg-brand-purple text-white border-brand-purple"
                          : "border-gray-300 hover:border-brand-purple"
                      }`}
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-4 pt-4">
            <div className="w-20">
              <Select
                value={quantity.toString()}
                onValueChange={(value) => setQuantity(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="bg-brand-purple hover:bg-brand-purple/90 px-8"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
          
          {/* Stock Info */}
          <div className="pt-2">
            <p className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 
                ? `In Stock (${product.stock} remaining)` 
                : "Out of Stock"
              }
            </p>
          </div>
          
          {/* Tags and Categories */}
          <div className="pt-4 border-t">
            <div className="flex items-center text-sm text-gray-500">
              <span className="font-medium mr-2">Category:</span>
              <span>{product.category}</span>
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
