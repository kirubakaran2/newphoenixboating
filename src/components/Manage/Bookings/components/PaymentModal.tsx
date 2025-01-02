import React, { useState } from 'react';
import type { Booking } from '../../../types';

interface PaymentModalProps {
  booking: Booking;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export default function PaymentModal({ booking, onClose, onSubmit }: PaymentModalProps) {
  const [amount, setAmount] = useState(booking.balance);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Update Payment</h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Customer</p>
            <p className="font-medium">{booking.customerName}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Service</p>
            <p className="font-medium">{booking.service}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="font-medium">₹{booking.amount.toLocaleString()}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className="font-medium">₹{booking.balance.toLocaleString()}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Amount
            </label>
            <input
              type="number"
              max={booking.balance}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(amount)}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Update Payment
          </button>
        </div>
      </div>
    </div>
  );
}