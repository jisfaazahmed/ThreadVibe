
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartSummaryProps {
  subtotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal }) => {
  const navigate = useNavigate();
  const shipping = subtotal > 10000 ? 0 : 500; // Updated to LKR values
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>LKR {subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? "Free" : `LKR ${shipping.toFixed(2)}`}
            {shipping === 0 && <span className="text-xs ml-1 text-green-600">(Orders over LKR 10,000)</span>}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax (estimated)</span>
          <span>LKR {tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-3 mt-3 font-semibold flex justify-between">
          <span>Total</span>
          <span>LKR {total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6 bg-brand-purple hover:bg-brand-purple/90"
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout
      </Button>
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          className="text-sm"
          onClick={() => navigate('/products')}
        >
          Continue Shopping
        </Button>
      </div>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>
          We accept all major credit cards, PayPal, and Apple Pay.
          100% secure payment processing.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
