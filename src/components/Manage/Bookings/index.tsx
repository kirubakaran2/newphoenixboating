import React from 'react';
import BookingsHeader from './components/BookingsHeader';
import BookingsDisplay from './components/BookingsDisplay';

export default function Bookings() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Booking Management</h1>
          <BookingsHeader />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <BookingsDisplay />
        </div>
      </div>
    </div>
  );
}