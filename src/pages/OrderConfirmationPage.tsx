
import React from "react";
import { useLocation, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const OrderConfirmationPage = () => {
  const location = useLocation();
  
  // Get order details from location state or generate fallback values
  const orderData = location.state || {};
  const orderNumber = orderData.orderNumber || Math.floor(100000 + Math.random() * 900000);
  const orderId = orderData.orderId || "unknown";
  const email = orderData.email || "customer@example.com";
  const paymentMethod = orderData.paymentMethod === "credit_card" ? "Credit Card" : "Cash on Delivery";

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. We've received your order and will process it right away.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-medium">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Email:</span>
                <span>{email}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{paymentMethod}</span>
              </div>
            </div>
          </div>
          
          <p className="mb-8 text-gray-600">
            A confirmation email has been sent to your email address with all the details.
            You can track your order status in the order history section of your account.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/account">View Your Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderConfirmationPage;
