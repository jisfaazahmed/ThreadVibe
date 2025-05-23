
export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export interface CheckoutFormProps {
  userProfile: UserProfile | null;
  isProfileLoading: boolean;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface CreditCardInfo {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}
