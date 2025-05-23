
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckoutFormData } from "../types";
import { decreaseStockOnNewOrder } from "@/utils/product-stock";
import { useQueryClient } from "@tanstack/react-query";

export const validateCheckoutForm = (formData: CheckoutFormData): boolean => {
  const { firstName, lastName, address, city, state, postalCode, country } = formData;
  
  if (!firstName || !lastName || !address || !city || !state || !postalCode || !country) {
    toast.error("Please fill in all required fields");
    return false;
  }
  
  return true;
};

export const submitGuestOrder = async (formData: CheckoutFormData) => {
  // Create a guest customer if user is not logged in
  const { data: customerData, error: customerError } = await supabase
    .from("customers")
    .insert({
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      address_line1: formData.address,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postalCode,
      country: formData.country
    })
    .select();

  if (customerError) {
    console.error("Error creating customer:", customerError);
    throw new Error("Failed to create customer");
  }

  return customerData[0].id;
};

export const updateCustomerProfile = async (userId: string, formData: CheckoutFormData) => {
  // Update existing customer profile with new information
  const { error: updateError } = await supabase
    .from("customers")
    .update({
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      address_line1: formData.address,
      city: formData.city,
      state: formData.state,
      postal_code: formData.postalCode,
      country: formData.country
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating customer:", updateError);
    throw new Error("Failed to update customer information");
  }
};

export const createOrder = async (
  customerId: string,
  formData: CheckoutFormData,
  paymentMethod: string,
  totalAmount: number
) => {
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      shipping_address: formData.address,
      shipping_city: formData.city,
      shipping_state: formData.state,
      shipping_postal_code: formData.postalCode,
      shipping_country: formData.country,
      payment_method: paymentMethod,
      total_amount: totalAmount
    })
    .select();

  if (orderError) {
    console.error("Error creating order:", orderError);
    throw new Error("Failed to place order");
  }

  return orderData[0].id;
};

export const createOrderItems = async (orderId: string, items: any[]) => {
  const orderItems = items.map(item => ({
    order_id: orderId,
    product_id: item.product.id,
    variant_id: item.variantId,
    quantity: item.quantity,
    price: item.price
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Error creating order items:", itemsError);
    throw new Error("Failed to process order items");
  }
};

export const processOrder = async (
  customerId: string | undefined,
  userProfile: any,
  formData: CheckoutFormData,
  paymentMethod: string,
  cartItems: any[],
  totalAmount: number,
  queryClient: any
) => {
  // Handle customer creation or retrieval
  let finalCustomerId = customerId;

  if (!finalCustomerId) {
    finalCustomerId = await submitGuestOrder(formData);
  } else {
    // Update existing customer profile with new information
    await updateCustomerProfile(finalCustomerId, formData);
  }

  // Insert order
  const orderId = await createOrder(finalCustomerId, formData, paymentMethod, totalAmount);
  
  // Insert order items
  await createOrderItems(orderId, cartItems);
  
  // Decrease stock quantities after successful order placement
  await decreaseStockOnNewOrder(orderId, queryClient);
  
  return {
    orderId,
    orderNumber: Math.floor(100000 + Math.random() * 900000),
    email: userProfile?.email || "Guest",
    paymentMethod
  };
};
