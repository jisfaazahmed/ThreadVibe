
// Utility functions and constants related to order status

export type OrderStatus = "pending" | "processing" | "shipped" | "completed" | "cancelled";

export const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

export const getStatusLabel = (status: string): string => {
  const option = statusOptions.find((opt) => opt.value === status);
  return option?.label || status.charAt(0).toUpperCase() + status.slice(1);
};
