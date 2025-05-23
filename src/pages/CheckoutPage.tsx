
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useCustomer } from '@/hooks/use-customer';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const { profile, isLoading: isProfileLoading } = useCustomer();

  // Fetch user profile if authenticated
  const userProfile = user ? {
    id: user.id,
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    email: user.email || '',
    phone: profile?.phone || '',
    address: profile?.address_line1 || '',
    city: profile?.city || '',
    state: profile?.state || '',
    postalCode: profile?.postal_code || '',
    country: profile?.country || ''
  } : null;

  // We're no longer handling form submission here, as it's delegated to CheckoutForm component

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CheckoutForm 
              userProfile={userProfile}
              isProfileLoading={isProfileLoading}
            />
          </div>
          
          <div className="md:col-span-1">
            {/* Order summary sidebar */}
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="flex-1">
                      {item.product.name} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span>LKR {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>LKR {getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
