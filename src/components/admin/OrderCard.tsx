
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Eye } from "lucide-react";
import OrderStatusUpdate from "./OrderStatusUpdate";
import OrderItemsList from "./OrderItemsList";
import CustomerInfoDisplay from "./CustomerInfoDisplay";
import ShippingAddressDisplay from "./ShippingAddressDisplay";

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

type CustomerInfo = {
  first_name: string | null;
  last_name: string | null;
  email?: string | null;
  phone?: string | null;
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

interface OrderCardProps {
  order: Order;
  onView: (orderId: string) => void;
  onEdit: (order: Order) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onView, onEdit }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-medium">{order.id.substring(0, 8)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">
            {format(new Date(order.created_at), "MMM d, yyyy")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Customer</p>
          <CustomerInfoDisplay customer={order.customer} showEmail={true} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-medium">LKR {order.total_amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <div className="mt-1">
            <OrderStatusUpdate 
              orderId={order.id} 
              currentStatus={order.status} 
              size="sm"
            />
          </div>
        </div>
      </div>
      
      <ShippingAddressDisplay 
        address={order.shipping_address}
        city={order.shipping_city}
        state={order.shipping_state}
        postalCode={order.shipping_postal_code}
        country={order.shipping_country}
      />

      <OrderItemsList items={order.items} />
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={() => onView(order.id)}>
          <Eye className="mr-1 h-4 w-4" /> View Details
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(order)}>
          <Pencil className="mr-1 h-4 w-4" /> Edit
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
