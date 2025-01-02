import { motion } from 'framer-motion';
import { Anchor, Compass, Ship, Gift, Heart, Sunset } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: <Ship className="h-8 w-8 text-blue-600" />,
      title: 'Modern Fleet',
      description: 'Experience luxury with our state-of-the-art boats'
    },
    {
      icon: <Compass className="h-8 w-8 text-blue-600" />,
      title: 'Expert Guides', 
      description: 'Professional skippers with years of experience'
    },
    {
      icon: <Anchor className="h-8 w-8 text-blue-600" />,
      title: 'Safety First',
      description: 'Your safety is our top priority on every journey'
    },
    {
      icon: <Gift className="h-8 w-8 text-blue-600" />,
      title: 'Birthday Celebration',
      description: 'Make your special day memorable with our birthday packages'
    },
    {
      icon: <Heart className="h-8 w-8 text-blue-600" />,
      title: 'Couples Special Ride',
      description: 'Romantic boat rides perfect for couples'
    },
    {
      icon: <Sunset className="h-8 w-8 text-blue-600" />,
      title: 'Sunset Cruises',
      description: 'Experience breathtaking views during our sunset cruises'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've been providing unforgettable maritime experiences for over a decade, combining luxury, adventure, and safety.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg shadow-lg bg-white"
            >
              <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};