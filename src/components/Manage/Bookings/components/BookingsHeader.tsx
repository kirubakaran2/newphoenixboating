import React, { useState } from 'react';
import { Calendar, Clock, Phone, User } from 'lucide-react';
import { Toaster, toast } from 'sonner';

// Define the base URL for the API
const BASE_URL = "https://phoneixboatingbackend.onrender.com/api/bookings";

// Define an interface for the booking form
interface BookingForm {
  name: string;
  phoneNumber: string;
  date: string;
  timeSlot: string;
}

export default function BookingsHeader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingForm>({
    name: '',
    phoneNumber: '',
    date: '',
    timeSlot: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNewBooking = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
    setBookingForm({
      name: '',
      phoneNumber: '',
      date: '',
      timeSlot: '',
    });
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:30 AM - 01:30 PM',
    '02:00 PM - 04:00 PM',
    '04:30 PM - 06:30 PM'
  ];

  const confirmBooking = async () => {
    setLoading(true);
    setError(null);

    const { name, phoneNumber, date, timeSlot } = bookingForm;
    
    if (!name.trim()) {
      setError('Name is required.');
      setLoading(false);
      return;
    }

    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      setLoading(false);
      return;
    }

    if (!date) {
      setError('Date is required.');
      setLoading(false);
      return;
    }

    if (!timeSlot) {
      setError('Time slot is required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date: new Date(date).toISOString(),
          timeSlot,
          phoneNumber
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to create booking');
      }

      const data = await response.json();
      console.log('Booking created:', data);
      
      toast.success('Booking Created Successfully!', {
        description: `Booking for ${name} on ${date} at ${timeSlot}`,
        duration: 3000,
      });
      
      closeModal();

      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Booking Failed', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        duration: 3000,
      });
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 md:p-6 bg-blue-600 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
              <Calendar className="w-7 h-7" />
              Bookings
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <select 
                className="bg-blue-500 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full sm:w-auto"
                aria-label="Booking filter"
              >
                <option value="all" className="bg-white text-black">All Bookings</option>
              </select>
              <button
                onClick={handleNewBooking}
                className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
                aria-label="Create New Booking"
              >
                <Clock className="w-5 h-5" />
                New Booking
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-xl w-full max-w-md shadow-2xl transform transition-all my-8">
              <div className="bg-blue-600 text-white p-4 md:p-6 rounded-t-xl">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                  <Calendar className="w-6 h-6" />
                  New Booking Details
                </h2>
              </div>

              <div className="p-4 md:p-6">
                {error && (
                  <div 
                    className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded" 
                    role="alert"
                  >
                    <p className="font-bold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Error
                    </p>
                    <p>{error}</p>
                  </div>
                )}

                <form className="space-y-4">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={bookingForm.name}
                        onChange={handleInputChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={bookingForm.phoneNumber}
                        onChange={handleInputChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        value={bookingForm.date}
                        onChange={handleInputChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-1">
                      Time Slot
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        value={bookingForm.timeSlot}
                        onChange={handleInputChange}
                        className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select a time slot</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </form>
                
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors w-full sm:w-auto"
                    aria-label="Cancel Booking"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBooking}
                    className={`px-4 py-2 rounded-md text-white transition-colors flex items-center justify-center gap-2 w-full sm:w-auto ${
                      loading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    }`}
                    disabled={loading}
                    aria-label="Confirm Booking"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
}