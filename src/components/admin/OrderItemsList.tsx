
import React from "react";

type OrderItem = {
  id: string;
  product?: {
    name: string;
  };
  quantity: number;
  price: number;
};

interface OrderItemsListProps {
  items: OrderItem[];
}

const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <div className="border-t pt-4">
      <p className="text-sm font-medium mb-2">Items:</p>
      <ul className="text-sm text-gray-600 space-y-1">
        {items && items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              {item.product?.name || "Unknown Product"} x {item.quantity} - LKR{" "}
              {item.price.toFixed(2)}
            </li>
          ))
        ) : (
          <li>No items found for this order</li>
        )}
      </ul>
    </div>
  );
};

export default OrderItemsList;
