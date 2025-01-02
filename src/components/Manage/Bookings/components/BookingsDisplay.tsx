import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  _id: string;
  name: string;
  date: string;
  timeSlot: string;
  phoneNumber: string;
}

const BASE_URL = "https://phoneixboatingbackend.onrender.com/api";

export default function BookingDisplay() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const toastId = toast.loading('Fetching bookings...');
    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await fetch(`${BASE_URL}/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data = await response.json();

      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
        toast.success('Bookings fetched successfully', {
          id: toastId,
        });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      toast.error('Failed to fetch bookings. Please try again later.', {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    const toastId = toast.loading('Deleting booking...');
    const token = sessionStorage.getItem('jwtToken');

    try {
      const response = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete booking');
      
      setBookings(bookings.filter(booking => booking._id !== id));
      toast.success('Booking deleted successfully', {
        id: toastId,
      });
    } catch (err) {
      toast.error('Failed to delete booking. Please try again.', {
        id: toastId,
      });
      console.error('Delete error:', err);
    }
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking({...booking});
    toast.info('Editing booking...');
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!editingBooking) return;

    const toastId = toast.loading('Updating booking...');
    const token = sessionStorage.getItem('jwtToken');
  
    try {
      const response = await fetch(`${BASE_URL}/bookings/${editingBooking._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingBooking.name,
          date: editingBooking.date,
          timeSlot: editingBooking.timeSlot,
          phoneNumber: editingBooking.phoneNumber
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update booking');
      }
  
      const updatedData = await response.json();
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === editingBooking._id ? updatedData.booking : booking
        )
      );
  
      setEditingBooking(null);
      toast.success('Booking updated successfully', {
        id: toastId,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update booking. Please try again.', {
        id: toastId,
      });
      console.error('Update error:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px] text-red-600">
        <AlertCircle className="w-6 h-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider md:px-6">Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider md:px-6">Phone Number</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider md:px-6">Date</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider md:px-6">Time Slot</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider md:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 md:px-6">
                      {booking.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 md:px-6">
                      {booking.phoneNumber}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 md:px-6">
                      {new Date(booking.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 md:px-6">
                      {booking.timeSlot}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium md:px-6">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Booking</h2>
            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingBooking.name}
                  onChange={(e) => {
                    setEditingBooking({...editingBooking, name: e.target.value});
                    toast.info('Updating name...');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={editingBooking.phoneNumber}
                  onChange={(e) => {
                    setEditingBooking({...editingBooking, phoneNumber: e.target.value});
                    toast.info('Updating phone number...');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="datetime-local"
                  value={editingBooking.date.slice(0, 16)}
                  onChange={(e) => {
                    setEditingBooking({...editingBooking, date: e.target.value});
                    toast.info('Updating date...');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                <input
                  type="text"
                  value={editingBooking.timeSlot}
                  onChange={(e) => {
                    setEditingBooking({...editingBooking, timeSlot: e.target.value});
                    toast.info('Updating time slot...');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setEditingBooking(null);
                    toast.info('Cancelled editing');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}