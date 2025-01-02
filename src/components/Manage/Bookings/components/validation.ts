import { PaymentDetails } from './types';

export const validateCustomer = (value: string) => {
  if (!value.trim()) return 'Customer name is required';
  if (value.length < 2) return 'Customer name must be at least 2 characters';
  return undefined;
};

export const validateService = (value: string) => {
  if (!value.trim()) return 'Service is required';
  return undefined;
};

export const validateContactNumber = (value: string) => {
  const contactRegex = /^[0-9]{10}$/;
  if (!contactRegex.test(value)) return 'Contact number must be 10 digits';
  return undefined;
};

export const validatePaymentDetails = (paymentDetails: PaymentDetails) => {
  const { totalAmount = 0, balanceAmount = 0 } = paymentDetails;

  if (totalAmount < 0) return 'Total amount cannot be negative';
  if (balanceAmount < 0) return 'Balance amount cannot be negative';
  if (balanceAmount > totalAmount) return 'Balance cannot exceed total amount';
  
  return undefined;
};