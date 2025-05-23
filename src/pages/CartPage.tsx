
import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const { cartItems, getCartTotal } = useCart();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                    id={item.product.id}
                    name={item.product.name}
                    price={item.product.price}
                    image={item.product.images[0]}
                    quantity={item.quantity}
                    selectedSize={item.selectedSize}
                    selectedColor={item.selectedColor}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <CartSummary subtotal={getCartTotal()} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CartPage;
