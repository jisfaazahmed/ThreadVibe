
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useOrderDetails } from "@/hooks/use-order-details";
import OrderDetailHeader from "@/components/admin/OrderDetailHeader";
import OrderStatusSection from "@/components/admin/OrderStatusSection";
import OrderInfoSection from "@/components/admin/OrderInfoSection";
import OrderItemsTable from "@/components/admin/OrderItemsTable";
import OrderTotal from "@/components/admin/OrderTotal";

const AdminOrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading } = useOrderDetails(id);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" className="mb-6" onClick={() => navigate("/admin")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
        </Button>

        {order ? (
          <div className="space-y-8">
            <Card>
              <OrderDetailHeader 
                id={order.id}
                createdAt={order.created_at}
                status={order.status}
                onPrint={handlePrint}
              />
              <CardContent>
                {/* Order Status Update Section */}
                <OrderStatusSection 
                  orderId={order.id} 
                  currentStatus={order.status}
                />

                {/* Customer and Shipping Information */}
                <OrderInfoSection 
                  customer={order.customer}
                  shippingAddress={order.shipping_address}
                  shippingCity={order.shipping_city}
                  shippingState={order.shipping_state}
                  shippingPostalCode={order.shipping_postal_code}
                  shippingCountry={order.shipping_country}
                />

                {/* Order Items Table */}
                <OrderItemsTable items={order.items} />

                {/* Order Total */}
                <OrderTotal 
                  totalAmount={order.total_amount} 
                  updatedAt={order.updated_at} 
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Order not found</h1>
            <p className="mb-8">The order you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/admin">Back to Admin Dashboard</Link>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminOrderDetailPage;
