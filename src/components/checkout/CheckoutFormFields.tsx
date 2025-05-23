
import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

export const FormField = ({
  id,
  label,
  value,
  onChange,
  required = true,
  type = "text",
  placeholder = ""
}: FormFieldProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      />
    </div>
  );
};

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const PaymentMethodSelector = ({
  value,
  onChange
}: PaymentMethodSelectorProps) => {
  return (
    <div>
      <label htmlFor="paymentMethod" className="block text-sm font-medium">
        Payment Method
      </label>
      <select
        id="paymentMethod"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
      >
        <option value="credit_card">Credit Card</option>
        <option value="cash_on_delivery">Cash on Delivery</option>
      </select>
    </div>
  );
};
