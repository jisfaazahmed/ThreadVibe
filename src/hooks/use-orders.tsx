
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

export const useOrders = () => {
  return useQuery({
    queryKey: ["adminOrders"],
    queryFn: async (): Promise<Order[]> => {
      try {
        // First get orders 
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (ordersError) {
          console.error("Error fetching orders:", ordersError);
          toast.error("Failed to load orders");
          throw ordersError;
        }

        console.log("Admin orders fetched:", ordersData);
        
        if (!ordersData || ordersData.length === 0) {
          return [];
        }

        // Now fetch items for each order
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order) => {
            // Get items for this order
            const { data: itemsData, error: itemsError } = await supabase
              .from("order_items")
              .select(`
                *,
                product:products(name)
              `)
              .eq("order_id", order.id);

            if (itemsError) {
              console.error(`Error fetching items for order ${order.id}:`, itemsError);
              return {
                ...order,
                items: [],
                customer: { first_name: "Guest", last_name: "User" }
              };
            }

            // Default customer info in case we can't fetch it
            let customerInfo: CustomerInfo = { 
              first_name: "Guest", 
              last_name: "User",
              email: null,
              phone: null
            };

            if (order.customer_id) {
              try {
                const { data: customerData, error: customerError } = await supabase
                  .from("customers")
                  .select("first_name, last_name, phone, address_line1")
                  .eq("id", order.customer_id);

                if (!customerError && customerData && customerData.length > 0) {
                  customerInfo = {
                    first_name: customerData[0].first_name || "Guest",
                    last_name: customerData[0].last_name || "User",
                    phone: customerData[0].phone,
                    // We don't have email in the customers table,
                    // so we'll leave it as null
                    email: null
                  };
                } else {
                  console.error("Error fetching customer:", customerError);
                }
              } catch (err) {
                console.error("Error processing customer data:", err);
              }
            }

            return {
              ...order,
              items: itemsData || [],
              customer: customerInfo,
            };
          })
        );

        return ordersWithItems as Order[];
      } catch (error) {
        console.error("Error in adminOrders query:", error);
        toast.error("Failed to load orders");
        throw error;
      }
    },
  });
};
