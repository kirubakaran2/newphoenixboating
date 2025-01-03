import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookingModal } from './BookingModal';
import { ImageSlider } from './slider/ImageSlider';
import puducherry from './puducherry.png';
import logo from './logo2.png';

export const Hero = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section id="home" className="relative min-h-screen w-full">
      <ImageSlider />
      
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.img
            src={puducherry}
            alt="Puducherry"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 sm:mb-6"
          />

<motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold mb-6"
          >
            Experience the Ocean's Magic
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl mb-6 sm:mb-8 font-serif italic px-2"
          >
            Embark on an unforgettable journey across the waves
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl mb-3 font-medium font-serif"
          >
            <span className="block sm:inline">For Reservations:</span>
            <span className="block sm:inline sm:ml-2">9087396092|7092836450|9092446092</span>
          </motion.p>

          <div className="relative mt-2 sm:mt-2">
            <motion.img
              src={logo}
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setIsBookingOpen(true)}
              className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Book Your Adventure
            </motion.button>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </section>
  );
};