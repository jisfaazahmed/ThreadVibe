
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import StatusSelector from "./StatusSelector";
import { updateProductStock, restoreProductStock } from "@/utils/product-stock";

type OrderStatusUpdateProps = {
  orderId: string;
  currentStatus: string;
  onStatusChange?: (newStatus: string) => void;
  size?: "sm" | "default";
};

const OrderStatusUpdate = ({ 
  orderId, 
  currentStatus, 
  onStatusChange,
  size = "default"
}: OrderStatusUpdateProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();

  const handleStatusChange = async () => {
    if (status === currentStatus) return;
    
    setIsUpdating(true);
    
    try {
      // Update the order status
      const { error } = await supabase
        .from("orders")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", orderId);

      if (error) throw error;
      
      // Handle special status changes like "shipped" or "cancelled"
      if (status === "shipped" && (currentStatus === "pending" || currentStatus === "processing")) {
        await updateProductStock(orderId, queryClient);
      } else if (status === "cancelled" && currentStatus !== "cancelled") {
        await restoreProductStock(orderId, queryClient);
      }

      toast.success(`Order status updated to ${status}`);
      
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["adminOrders"] });
      queryClient.invalidateQueries({ queryKey: ["orderDetail", orderId] });
      
      if (onStatusChange) {
        onStatusChange(status);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <StatusSelector 
        status={status} 
        setStatus={setStatus}
        size={size}
      />
      <Button
        variant="outline"
        size={size}
        onClick={handleStatusChange}
        disabled={status === currentStatus || isUpdating}
      >
        {isUpdating ? "Updating..." : "Update"}
      </Button>
    </div>
  );
};

export default OrderStatusUpdate;
