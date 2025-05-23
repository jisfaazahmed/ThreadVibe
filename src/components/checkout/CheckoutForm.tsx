
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { FormField, PaymentMethodSelector } from "./CheckoutFormFields";
import CreditCardForm from "./CreditCardForm";
import { CheckoutFormProps } from "./types";
import { validateCheckoutForm, processOrder } from "./utils/checkout-helpers";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CheckoutForm = ({ userProfile, isProfileLoading }: CheckoutFormProps) => {
  const { cartItems, clearCart, getCartTotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Populate form with user profile data if available
  useEffect(() => {
    if (userProfile && !isProfileLoading) {
      setFirstName(userProfile.first_name || "");
      setLastName(userProfile.last_name || "");
      setPhone(userProfile.phone || "");
      setAddress(userProfile.address || "");
      setCity(userProfile.city || "");
      setState(userProfile.state || "");
      setPostalCode(userProfile.postalCode || "");
      setCountry(userProfile.country || "");
      setCardholderName(`${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim());
    }
  }, [userProfile, isProfileLoading]);

  const validateCreditCardInfo = () => {
    if (paymentMethod !== "credit_card") return true;
    
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    
    if (!cardholderName.trim()) {
      toast.error("Please enter the cardholder name");
      return false;
    }
    
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    
    if (!cvv || cvv.length !== 3) {
      toast.error("Please enter a valid 3-digit CVV");
      return false;
    }
    
    return true;
  };

  const processCreditCardPayment = async () => {
    setIsProcessingPayment(true);
    
    // Simulate credit card processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demonstration purposes, we'll approve all payments
    // In a real implementation, you would integrate with a payment gateway like Stripe
    const isPaymentSuccessful = true;
    
    setIsProcessingPayment(false);
    return isPaymentSuccessful;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Collect form data
      const formData = {
        firstName,
        lastName,
        phone,
        address,
        city,
        state,
        postalCode,
        country
      };
      
      // Validate form fields
      if (!validateCheckoutForm(formData) || !validateCreditCardInfo()) {
        setIsSubmitting(false);
        return;
      }

      // Process credit card payment if selected
      if (paymentMethod === "credit_card") {
        const paymentSuccessful = await processCreditCardPayment();
        if (!paymentSuccessful) {
          toast.error("Payment processing failed. Please try again.");
          setIsSubmitting(false);
          return;
        }
        toast.success("Payment processed successfully!");
      }

      // Process order
      const totalAmount = getCartTotal() + (getCartTotal() > 10000 ? 0 : 500) + getCartTotal() * 0.08;
      const result = await processOrder(
        userProfile?.id,
        userProfile,
        formData,
        paymentMethod,
        cartItems,
        totalAmount,
        queryClient
      );
      
      // Clear cart
      clearCart();
      
      // Navigate to confirmation
      navigate("/order-confirmation", { state: result });
      
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("An error occurred while processing your order");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitOrder} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <FormField
          id="lastName"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      
      <FormField
        id="phone"
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required={false}
        type="tel"
      />
      
      <FormField
        id="address"
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="city"
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormField
          id="state"
          label="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="postalCode"
          label="Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <FormField
          id="country"
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      
      <div className="mt-6">
        <PaymentMethodSelector
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
      </div>

      {paymentMethod === "credit_card" && (
        <CreditCardForm
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          cardholderName={cardholderName}
          setCardholderName={setCardholderName}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          cvv={cvv}
          setCvv={setCvv}
        />
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-brand-purple hover:bg-brand-purple/90 mt-6" 
        disabled={isSubmitting || isProcessingPayment}
      >
        {isProcessingPayment ? "Processing Payment..." : isSubmitting ? "Processing..." : "Place Order"}
      </Button>

      <Dialog open={isProcessingPayment} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" showClose={false}>
          <DialogHeader>
            <DialogTitle>Processing Payment</DialogTitle>
            <DialogDescription>
              Please wait while we process your payment...
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center p-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default CheckoutForm;
