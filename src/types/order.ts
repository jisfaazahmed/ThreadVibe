
export type CustomerInfo = {
  first_name: string | null;
  last_name: string | null;
  email?: string | null;
  phone?: string | null;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  quantity: number;
  price: number;
  created_at: string;
  product: {
    name: string;
  };
};

export type Order = {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  customer_id: string | null;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  payment_method: string | null;
  updated_at: string;
  items: OrderItem[];
  customer: CustomerInfo;
};
