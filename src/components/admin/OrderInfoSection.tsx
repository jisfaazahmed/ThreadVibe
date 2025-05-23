
import React from "react";
import CustomerInfoDisplay from "./CustomerInfoDisplay";
import ShippingAddressDisplay from "./ShippingAddressDisplay";

interface CustomerInfo {
  first_name: string | null;
  last_name: string | null;
  email?: string | null;
  phone?: string | null;
}

interface OrderInfoSectionProps {
  customer: CustomerInfo;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
}

const OrderInfoSection: React.FC<OrderInfoSectionProps> = ({
  customer,
  shippingAddress,
  shippingCity,
  shippingState,
  shippingPostalCode,
  shippingCountry,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Customer Information */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">
          Customer Information
        </h3>
        <div className="text-sm space-y-1">
          <CustomerInfoDisplay customer={customer} showEmail={true} />
          {customer?.phone && <p>{customer.phone}</p>}
        </div>
      </div>

      {/* Shipping Information */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">
          Shipping Information
        </h3>
        <ShippingAddressDisplay
          address={shippingAddress}
          city={shippingCity}
          state={shippingState}
          postalCode={shippingPostalCode}
          country={shippingCountry}
        />
      </div>
    </div>
  );
};

export default OrderInfoSection;
