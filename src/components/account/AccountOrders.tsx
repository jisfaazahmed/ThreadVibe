
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  items: {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
};

const AccountOrders = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["customerOrders", user?.id],
    queryFn: async (): Promise<Order[]> => {
      if (!user) return [];
      
      // Get orders with their items
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          items:order_items(
            id,
            product_id,
            quantity,
            price,
            product:products(name)
          )
        `)
        .eq("customer_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
      
      console.log("User orders fetched:", data);
      return data || [];
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return "bg-green-100 text-green-800";
      case 'processing':
        return "bg-blue-100 text-blue-800";
      case 'shipped':
        return "bg-purple-100 text-purple-800";
      case 'cancelled':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-t-brand-purple rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
            <Link to="/products" className="text-brand-purple hover:underline">
              Start shopping
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order placed</p>
                  <p className="font-medium">
                    {format(new Date(order.created_at), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-medium">{order.id.substring(0, 8)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-medium">LKR {order.total_amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge
                    className={`font-medium mt-1 ${getStatusColor(order.status)}`}
                    variant="outline"
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              {/* Order Items Section */}
              <div className="border-t border-b py-4 mb-4">
                <p className="text-sm text-gray-500 mb-2">Items</p>
                <ul className="space-y-2">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-sm">
                      <div className="flex justify-between">
                        <span>{item.product?.name || "Product"} × {item.quantity}</span>
                        <span>LKR {item.price.toFixed(2)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-b pt-2 pb-4">
                <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                <p className="text-sm">
                  {order.shipping_address}, {order.shipping_city}, {order.shipping_state},{" "}
                  {order.shipping_postal_code}, {order.shipping_country}
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/orders/${order.id}`}
                  className="text-sm text-brand-purple hover:underline"
                >
                  View order details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountOrders;
