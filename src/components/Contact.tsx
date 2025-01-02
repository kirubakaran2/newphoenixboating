import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import { MdEmail } from 'react-icons/md';

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any questions or special requests.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-600 mr-4" />
                <a
                  href="tel:+919092446092"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +91 9092446092 | +91 9087396902
                </a>
              </div>
              <div className="flex items-center">
                <MdEmail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" />
                <a
                  href="mailto:newphoenixboatingadventures@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors break-words"
                >
                  newphoenixboatingadventures@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                <a
                  href="https://maps.app.goo.gl/Q2woftqfnjB7cHU77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  New Phoenix Boating & Adventures
                </a>
              </div>
            </div>
          </motion.div>

          {/* Send Us a Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
