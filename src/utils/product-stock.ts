import { supabase } from "@/integrations/supabase/client";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Update product stock when an order is shipped
export const updateProductStock = async (
  orderId: string,
  queryClient: QueryClient
): Promise<void> => {
  try {
    // Get the order items
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("product_id, quantity")
      .eq("order_id", orderId);
      
    if (itemsError) throw itemsError;
    
    // Update stock for each product
    for (const item of orderItems || []) {
      // Get current stock
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();
        
      if (productError) {
        console.error(`Error fetching product ${item.product_id}:`, productError);
        continue;
      }
      
      // Calculate new stock level, ensuring it doesn't go below 0
      const newStock = Math.max(0, product.stock - item.quantity);
      
      // Update the product stock
      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.product_id);
        
      if (updateError) {
        console.error(`Error updating stock for product ${item.product_id}:`, updateError);
      }
    }
    
    // Invalidate products query to refresh data
    queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    
  } catch (error) {
    console.error("Error updating product stock:", error);
    toast.error("Failed to update product stock levels");
  }
};

// Restore product stock when an order is cancelled
export const restoreProductStock = async (
  orderId: string,
  queryClient: QueryClient
): Promise<void> => {
  try {
    // Get the order items
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("product_id, quantity")
      .eq("order_id", orderId);
      
    if (itemsError) throw itemsError;
    
    // Update stock for each product
    for (const item of orderItems || []) {
      // Get current stock
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();
        
      if (productError) {
        console.error(`Error fetching product ${item.product_id}:`, productError);
        continue;
      }
      
      // Calculate new stock level
      const newStock = product.stock + item.quantity;
      
      // Update the product stock
      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.product_id);
        
      if (updateError) {
        console.error(`Error updating stock for product ${item.product_id}:`, updateError);
      }
    }
    
    // Invalidate products query to refresh data
    queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    
  } catch (error) {
    console.error("Error restoring product stock:", error);
    toast.error("Failed to restore product stock levels");
  }
};

// Update stock when a new order is created
export const decreaseStockOnNewOrder = async (
  orderId: string,
  queryClient: QueryClient
): Promise<void> => {
  try {
    // Get the order items
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select("product_id, quantity")
      .eq("order_id", orderId);
      
    if (itemsError) throw itemsError;
    
    // Update stock for each product
    for (const item of orderItems || []) {
      // Get current stock
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.product_id)
        .single();
        
      if (productError) {
        console.error(`Error fetching product ${item.product_id}:`, productError);
        continue;
      }
      
      // Calculate new stock level, ensuring it doesn't go below 0
      const newStock = Math.max(0, product.stock - item.quantity);
      
      // Update the product stock
      const { error: updateError } = await supabase
        .from("products")
        .update({ stock: newStock })
        .eq("id", item.product_id);
        
      if (updateError) {
        console.error(`Error updating stock for product ${item.product_id}:`, updateError);
      }
    }
    
    // Invalidate products query to refresh data
    queryClient.invalidateQueries({ queryKey: ["adminProducts"] });
    
  } catch (error) {
    console.error("Error updating product stock on new order:", error);
    toast.error("Failed to update product stock levels");
  }
};
