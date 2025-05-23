
import React from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
  selectedSize,
  selectedColor,
}) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium">
          <h3>{name}</h3>
          <p className="ml-4">LKR {(price * quantity).toFixed(2)}</p>
        </div>
        
        <p className="mt-1 text-sm text-gray-500">
          {selectedColor.name} / {selectedSize}
        </p>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity Selector */}
          <div className="flex items-center">
            <Select
              value={quantity.toString()}
              onValueChange={(value) => updateQuantity(id, parseInt(value))}
            >
              <SelectTrigger className="w-16 h-8">
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

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(id)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" /> Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
