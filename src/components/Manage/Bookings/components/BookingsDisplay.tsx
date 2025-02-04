import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Loader2, AlertCircle, Mail, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage as onMessageListener, getToken as getMessagingToken,MessagePayload } from 'firebase/messaging';
import { BASE_URL } from './constants';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhfTqykMUlZP4PcFDtfv9OjXbA6wW2isA",
  authDomain: "newphoenixboating.firebaseapp.com",
  projectId: "newphoenixboating",
  storageBucket: "newphoenixboating.firebasestorage.app",
  messagingSenderId: "810741899734",
  appId: "1:810741899734:web:9cec55f1c93bec76280477",
  measurementId: "G-5SL9QYPL0X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

interface Booking {
  _id: string;
  name: string;
  date: string;
  timeSlot: string;
  phoneNumber: string;
}

interface Email {
  _id: string;
  name: string;
  email: string;
  message: string;
}

export default function BookingDisplay() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editingEmail, setEditingEmail] = useState<Email | null>(null);
  const [showEmails, setShowEmails] = useState(false);
  const [showBookings, setShowBookings] = useState(true);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getMessagingToken(messaging);
          await registerDeviceToken(token);
        }
      } catch (error) {
        console.error('Notification setup failed:', error);
        toast.error('Failed to enable notifications');
      }
    };

    const registerDeviceToken = async (token: string) => {
      await fetch(`${BASE_URL}/register-device`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
    };

    requestNotificationPermission();
    fetchBookings();
    fetchEmails();

    const intervalId = setInterval(() => {
      fetchBookings();
      fetchEmails();
    }, 300000); // 5 minutes refresh

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const unsubscribe = onMessageListener(messaging, (payload: MessagePayload) => {
      console.log('Message received. ', payload);
      showNotification(payload.notification?.title || 'New Notification', payload.notification?.body || '');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showNotification = (title: string, body: string) => {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/icon.png',
      });
    }
  };

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
      setBookings(data.bookings);
      toast.success('Bookings fetched successfully', { id: toastId });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      toast.error('Failed to fetch bookings. Please try again later.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const fetchEmails = async () => {
    const toastId = toast.loading('Fetching emails...');
    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await fetch(`${BASE_URL}/email`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch emails');

      const data = await response.json();
      setEmails(data.emails);
      toast.success('Emails fetched successfully', { id: toastId });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emails');
      toast.error('Failed to fetch emails. Please try again later.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmail = async (id: string) => {
    if (!confirm('Are you sure you want to delete this email?')) return;

    const toastId = toast.loading('Deleting email...');
    const token = sessionStorage.getItem('jwtToken');

    try {
      const response = await fetch(`${BASE_URL}/emails/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to delete email');
      
      setEmails(emails.filter(email => email._id !== id));
      toast.success('Email deleted successfully', {
        id: toastId,
      });
    } catch (err) {
      toast.error('Failed to delete email. Please try again.', {
        id: toastId,
      });
      console.error('Delete error:', err);
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

  return (
    <div className="p-2 md:p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4 flex justify-end space-x-4">
        <button
          onClick={() => {
            setShowBookings(true);
            setShowEmails(false);
          }}
          className={`flex items-center px-4 py-2 text-sm font-medium text-white ${showBookings ? 'bg-purple-600' : 'bg-purple-400'} hover:bg-purple-700 rounded-md transition-colors`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {showBookings ? 'Hide Bookings' : 'View Bookings'}
        </button>
        <button
          onClick={() => {
            if (!showEmails) {
              fetchEmails();
            } else {
              setShowEmails(false);
              setShowBookings(true);
            }
          }}
          className={`flex items-center px-4 py-2 text-sm font-medium text-white ${showEmails ? 'bg-blue-600' : 'bg-blue-400'} hover:bg-blue-700 rounded-md transition-colors`}
        >
          <Mail className="w-4 h-4 mr-2" />
          {showEmails ? 'Hide Emails' : 'View Emails'}
        </button>
      </div>

      {showEmails && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Emails</h3>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                {/* Mobile view for emails */}
                {emails.map((email) => (
                  <div key={email._id} className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200 sm:hidden">
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-semibold text-lg text-gray-900">{email.name}</div>
                      <button
                        onClick={() => handleDeleteEmail(email._id)}
                        className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="text-base text-gray-600 mb-2">
                      <a href={`mailto:${email.email}`} className="text-blue-600 hover:underline">
                        {email.email}
                      </a>
                    </div>
                    <div className="text-base text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {email.message}
                    </div>
                  </div>
                ))}

                {/* Desktop view for emails */}
                <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {emails.map((email) => (
                      <tr key={email._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{email.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{email.message}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleDeleteEmail(email._id)}
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
        </div>
      )}

      {showBookings && (
        <div className="overflow-x-auto">
          <h3 className="text-xl font-bold mb-4">Bookings</h3>
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              {/* Mobile view */}
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200 sm:hidden">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-lg text-gray-900">{booking.name}</div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="text-red-600 hover:text-red-900 transition-colors p-2 rounded-full hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-base text-gray-600">
                      <span className="font-medium mr-2">Phone:</span>
                      <a href={`tel:${booking.phoneNumber}`} className="text-blue-600 hover:underline">
                        {booking.phoneNumber}
                      </a>
                    </div>
                    <div className="flex items-center text-base text-gray-600">
                      <span className="font-medium mr-2">Date:</span>
                      {new Date(booking.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-base text-gray-600">
                      <span className="font-medium mr-2">Time:</span>
                      {booking.timeSlot}
                    </div>
                  </div>
                </div>
              ))}

              {/* Desktop view */}
              <table className="min-w-full divide-y divide-gray-200 hidden sm:table">
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
      )}

      {editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Booking</h2>
            <form  className="space-y-5">
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

      {editingEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 md:mx-auto">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Edit Email</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={editingEmail.name}
                  onChange={(e) => {
                    setEditingEmail({...editingEmail, name: e.target.value});
                    toast.info('Updating name...');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingEmail.email}
                  onChange={(e) => {
                    setEditingEmail({...editingEmail, email: e.target.value});
                    toast.info('Updating email...');
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={editingEmail.message}
                  onChange={(e) => {
                    setEditingEmail({...editingEmail, message: e.target.value});
                    toast.info('Updating message...');
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setEditingEmail(null);
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