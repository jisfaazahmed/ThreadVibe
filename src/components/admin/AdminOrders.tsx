
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrders } from "@/hooks/use-orders";
import OrdersList from "./OrdersList";

const AdminOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useOrders();
  
  const handleViewOrder = (orderId: string) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleEditOrder = (order: any) => { // Using 'any' here to avoid importing the full type
    navigate(`/admin/orders/${order.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
        <CardDescription>
          Manage customer orders and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OrdersList 
          orders={orders || []} 
          onViewOrder={handleViewOrder} 
          onEditOrder={handleEditOrder}
        />
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
