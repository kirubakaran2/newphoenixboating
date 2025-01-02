import { motion } from 'framer-motion';
import { Sunset, Sailboat, Fish, Trees } from 'lucide-react';
import sunset from './sunset.jpg';
import mangrove from './mangrove.jpg';
import harbour from './harbour.jpg';
import arikamedu from './arikamedu.jpeg';

export const Services = () => {
  const services = [
    {
      icon: <Sunset className="h-8 w-8 text-blue-600" />,
      title: "Sunset Point",
      description: "Experience breathtaking sunset views at our prime location",
      image: sunset
    },
    {
      icon: <Trees className="h-8 w-8 text-blue-600" />,
      title: "Mangrove Forest",
      description: "Explore the mystical mangrove forests of Arikamedu",
      image: mangrove
    },
    {
      icon: <Fish className="h-8 w-8 text-blue-600" />,
      title: "Fishing Harbour",
      description: "Visit the vibrant local fishing harbour and experience marine life",
      image: harbour
    },
    {
      icon: <Sailboat className="h-8 w-8 text-blue-600" />,
      title: "Arikamedu Tours",
      description: "Discover the historic Arikamedu site by boat",
      image: arikamedu
    }
  ];

  return (
    <section id="services" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of maritime experiences in Puducherry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-lg shadow-lg bg-white group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-900 ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};