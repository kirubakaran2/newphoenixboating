import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { X, Check, Calendar, Clock, User, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [timeSlot, setTimeSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !timeSlot || !name || !phone) {
      setError('Please fill in all fields');
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch('https://phoneixboatingbackend.onrender.com/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          date: date.toISOString(),
          timeSlot,
          phoneNumber: phone
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        toast.success('Booking successful! We will contact you shortly.');
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          // Reset form
          setDate(null);
          setTimeSlot('');
          setName('');
          setPhone('');
          setError('');
        }, 3000);
      } else {
        setError('Booking failed. Please try again.');
        toast.error('Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
      console.error('Booking error:', err);
    }
  };

  if (!isOpen) return null;

  const timeSlots = [
    '07:00 AM - 11:00 AM',
    '11:30 AM - 01:30 PM',
    '02:00 PM - 04:00 PM',
    '04:30 PM - 06:30 PM'
  ];

  const disabledDays = { before: new Date() };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-0">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <div className="p-4 md:p-8">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Book Your Adventure
              </h2>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              <div>
                <img
                  src="https://i.postimg.cc/wTvX4j90/image1.png"
                  alt="Boat"
                  className="w-full h-48 md:h-56 object-cover rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform"
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={date ? date.toLocaleDateString() : ''}
                      onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                      readOnly
                      placeholder="Choose a date"
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base cursor-pointer"
                    />
                    {isCalendarOpen && (
                      <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-xl border">
                        <DayPicker
                          mode="single"
                          selected={date || undefined}
                          onSelect={(day: Date | undefined) => {
                            if (day) {
                              setDate(day);
                              setIsCalendarOpen(false);
                            }
                          }}
                          disabled={disabledDays}
                          modifiersStyles={{
                            selected: {
                              backgroundColor: '#2563eb',
                              color: 'white'
                            }
                          }}
                          className="p-3"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2 text-blue-600" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all shadow-lg text-base md:text-lg"
                >
                  Book Your Experience
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="p-6 md:p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 md:h-16 md:w-16 rounded-full bg-green-100 mb-4 md:mb-6">
              <Check className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Booking Successful!</h3>
            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
              Our team will call you shortly to confirm your booking details.
            </p>
            <div className="animate-pulse text-blue-600 text-sm md:text-base">Processing your request...</div>
          </div>
        )}
      </div>
    </div>
  );
};
