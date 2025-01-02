import { ReactNode } from 'react';

export type PaymentStatus = 'paid' | 'unpaid' | 'partial';
export type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'cash';
export type BookingStatus = 'accepted' | 'rejected' | 'pending';

export interface PaymentDetails {
  totalAmount?: number;
  balanceAmount?: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}

export interface Booking {
  _id: string;
  customer: string;
  service: string;
  date: string;
  address?: string;
  contactNumber: string;
  paymentDetails: PaymentDetails;
  bookingStatus: BookingStatus;
}

export interface BookingEditModalProps {
  booking: Booking;
  onClose: () => void;
  onUpdateBooking: (updatedBooking: Booking) => void;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'datetime-local';
  options?: { value: string; label: string }[];
  validation?: (value: any) => string | undefined;
}