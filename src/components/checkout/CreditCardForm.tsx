
import React from "react";
import { FormField } from "./CheckoutFormFields";

interface CreditCardFormProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardholderName: string;
  setCardholderName: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
}

const CreditCardForm: React.FC<CreditCardFormProps> = ({
  cardNumber,
  setCardNumber,
  cardholderName,
  setCardholderName,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv
}) => {
  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "").substring(0, 16);
    let formattedValue = "";
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += " ";
      }
      formattedValue += value[i];
    }
    
    setCardNumber(formattedValue);
  };

  // Format expiry date as MM/YY
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4);
    if (value.length > 2) {
      setExpiryDate(value.substring(0, 2) + "/" + value.substring(2));
    } else {
      setExpiryDate(value);
    }
  };

  return (
    <div className="space-y-4 border p-4 rounded-md bg-gray-50">
      <h3 className="font-medium text-gray-700">Credit Card Details</h3>
      
      <FormField
        id="cardNumber"
        label="Card Number"
        value={cardNumber}
        onChange={handleCardNumberChange}
        type="text"
        placeholder="1234 5678 9012 3456"
      />
      
      <FormField
        id="cardholderName"
        label="Cardholder Name"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
        type="text"
        placeholder="John Doe"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="expiryDate"
          label="Expiry Date (MM/YY)"
          value={expiryDate}
          onChange={handleExpiryDateChange}
          type="text"
          placeholder="MM/YY"
        />
        
        <FormField
          id="cvv"
          label="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
          type="text"
          placeholder="123"
        />
      </div>
    </div>
  );
};

export default CreditCardForm;
