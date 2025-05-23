
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

export const useOrderDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ["orderDetail", id],
    queryFn: async () => {
      if (!id) return null;

      try {
        console.log("Fetching order details for ID:", id);
        
        // Fetch order details
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .select(`
            *,
            items:order_items(
              *,
              product:products(name)
            )
          `)
          .eq("id", id)
          .single();

        if (orderError) {
          console.error("Error fetching order:", orderError);
          return null;
        }
        
        console.log("Order data fetched:", orderData);

        // Default customer info
        let customerInfo: CustomerInfo = {
          first_name: "Guest",
          last_name: "User",
          email: null,
          phone: null
        };

        // Fetch customer details if customer_id exists
        if (orderData.customer_id) {
          try {
            const { data: customerData, error: customerError } = await supabase
              .from("customers")
              .select("first_name, last_name, phone, address_line1")
              .eq("id", orderData.customer_id);

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
          ...orderData,
          customer: customerInfo,
        } as Order;
      } catch (error) {
        console.error("Error in orderDetail query:", error);
        toast.error("Failed to load order details");
        return null;
      }
    },
    enabled: !!id,
  });
};
