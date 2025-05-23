
import React from "react";

type CustomerInfo = {
  first_name: string | null;
  last_name: string | null;
  email?: string | null;
  phone?: string | null;
};

interface CustomerInfoDisplayProps {
  customer: CustomerInfo;
  showEmail?: boolean;
}

const CustomerInfoDisplay: React.FC<CustomerInfoDisplayProps> = ({ 
  customer, 
  showEmail = false 
}) => {
  return (
    <div className="font-medium">
      {customer?.first_name || "Guest"} {customer?.last_name || "User"}
      {(!customer?.first_name && !customer?.last_name) && 
        <span className="text-xs text-amber-600 ml-1">(Guest Checkout)</span>
      }
      {showEmail && customer?.email && (
        <p className="text-xs text-gray-500 font-normal mt-0.5">{customer.email}</p>
      )}
    </div>
  );
};

export default CustomerInfoDisplay;
