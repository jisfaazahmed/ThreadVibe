
import React from "react";

interface ShippingAddressDisplayProps {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
}

const ShippingAddressDisplay: React.FC<ShippingAddressDisplayProps> = ({ 
  address, 
  city, 
  state, 
  postalCode,
  country
}) => {
  return (
    <div className="text-sm">
      <p>{address}</p>
      <p>
        {city}, {state} {postalCode}
      </p>
      {country && <p>{country}</p>}
    </div>
  );
};

export default ShippingAddressDisplay;
