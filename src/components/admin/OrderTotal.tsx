
import React from "react";
import { format } from "date-fns";

interface OrderTotalProps {
  totalAmount: number;
  updatedAt: string;
}

const OrderTotal: React.FC<OrderTotalProps> = ({ totalAmount, updatedAt }) => {
  return (
    <div className="mt-6 flex justify-end">
      <div className="text-right">
        <div className="text-sm text-gray-600">Subtotal:</div>
        <div className="text-lg font-bold">
          LKR {totalAmount.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Last updated: {format(new Date(updatedAt), "MMM d, yyyy h:mm a")}
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;
