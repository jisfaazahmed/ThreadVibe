
import React from "react";

type OrderItem = {
  id: string;
  product?: {
    name: string;
  };
  quantity: number;
  price: number;
};

interface OrderItemsTableProps {
  items: OrderItem[];
}

const OrderItemsTable: React.FC<OrderItemsTableProps> = ({ items }) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium text-gray-700 mb-2">Order Items</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="px-5 py-5 border-b text-sm">
                    {item.product?.name || "Unknown Product"}
                  </td>
                  <td className="px-5 py-5 border-b text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-5 border-b text-sm">
                    LKR {item.price.toFixed(2)}
                  </td>
                  <td className="px-5 py-5 border-b text-sm font-medium">
                    LKR {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-5 text-center text-sm text-gray-500">
                  No items found for this order
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItemsTable;
