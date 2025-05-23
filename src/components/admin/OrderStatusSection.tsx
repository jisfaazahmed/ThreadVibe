
import React from "react";
import OrderStatusUpdate from "./OrderStatusUpdate";

interface OrderStatusSectionProps {
  orderId: string;
  currentStatus: string;
}

const OrderStatusSection: React.FC<OrderStatusSectionProps> = ({
  orderId,
  currentStatus,
}) => {
  return (
    <div className="mb-6 p-4 border rounded-md bg-gray-50">
      <h3 className="font-medium text-gray-700 mb-2">Update Order Status</h3>
      <p className="text-sm text-gray-500 mb-4">
        Change the status to keep the customer informed about their order.
      </p>
      <OrderStatusUpdate 
        orderId={orderId} 
        currentStatus={currentStatus}
      />
    </div>
  );
};

export default OrderStatusSection;
