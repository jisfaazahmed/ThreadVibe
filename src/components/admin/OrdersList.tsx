
import React from "react";
import OrderCard from "./OrderCard";

type CustomerInfo = {
  first_name: string | null;
  last_name: string | null;
  email?: string | null;
  phone?: string | null;
};

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price: number;
  created_at: string;
  product: {
    name: string;
  };
};

type Order = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  customer_id: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  payment_method: string | null;
  updated_at: string;
  items: OrderItem[];
  customer: CustomerInfo;
};

interface OrdersListProps {
  orders: Order[];
  onViewOrder: (orderId: string) => void;
  onEditOrder: (order: Order) => void;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders, onViewOrder, onEditOrder }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <OrderCard 
          key={order.id} 
          order={order} 
          onView={onViewOrder} 
          onEdit={onEditOrder}
        />
      ))}
    </div>
  );
};

export default OrdersList;
