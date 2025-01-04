import { Ship, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-800 to-blue-900 text-white pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="flex items-center mb-4 group">
              <Ship className="h-8 w-8 text-white group-hover:text-blue-300 transition-colors" />
              <span className="ml-2 text-xl font-bold group-hover:text-blue-300 transition-colors">New Phoenix Boating & Adventures</span>
            </div>
            <p className="text-blue-200 max-w-md mb-6 leading-relaxed">
              Experience the beauty of Arikamedu, Mangrove Forest, Sunset Point, and Fishing Harbour.
              Approved By Puducherry Tourism.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/newphoenixboatingpy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-200 hover:text-white transition-all transform hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
                <span className="ml-2">Check out our Instagram</span>
              </a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    className="text-blue-200 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 transform scale-0 group-hover:scale-100 transition-transform"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Contact Us</h3>
            <ul className="space-y-4 text-blue-200">
              <li className="flex items-center group hover:text-white transition-colors">
                <Phone className="h-5 w-5 mr-3 group-hover:text-blue-300 transition-colors" />
                <a href="tel:+919087396092" className="hover:text-white transition-colors">
                  +91 9092446092 | +91 9087396092
                </a>
              </li>
              <li className="flex items-center group hover:text-white transition-colors">
                <Mail className="h-5 w-5 mr-3 group-hover:text-blue-300 transition-colors" />
                <a href="mailto:newphoenixboatingadventures@gmail.com" className="hover:text-white transition-colors break-all">
                  newphoenixboatingadventures@gmail.com
                </a>
              </li>
              <li className="flex items-start group hover:text-white transition-colors">
                <MapPin className="h-5 w-5 mr-3 mt-1 group-hover:text-blue-300 transition-colors" />
                <a
                  href="https://maps.app.goo.gl/Q2woftqfnjB7cHU77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  New Phoenix boating & Adventures
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Operating Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4 text-blue-100">Operating Hours</h3>
            <div className="bg-blue-800/50 p-4 rounded-lg">
              <ul className="space-y-2 text-blue-200">
                <li className="flex items-center">
                  <span className="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                  Mon - Sun: 7 AM - 5 PM
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full h-64 rounded-lg overflow-hidden mb-8 shadow-lg hover:shadow-2xl transition-shadow"
        >
          <a 
            href="https://maps.app.goo.gl/Q2woftqfnjB7cHU77" 
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full relative group"
          >
            <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors z-10"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.94940084124!2d79.82483457505894!3d11.908609888317573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536184bcd13465%3A0xca0cadc30f75834e!2sNew%20Phoenix%20boating%20%26%20Adventures!5e0!3m2!1sen!2sin!4v1735122516695!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New Phoenix Boating & Adventures Location"
              className="filter blue hover:grayscale-0 transition-all duration-300"
            ></iframe>
          </a>
        </motion.div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-blue-800/50 text-center">
          <p className="text-blue-200 text-sm">
            &copy; {new Date().getFullYear()} New Phoenix Boating & Adventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};