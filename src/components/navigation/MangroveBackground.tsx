import { motion } from 'framer-motion';

export const MangroveBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Mangrove Roots */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{
          background: `url("https://images.unsplash.com/photo-1584554740459-4e9dda8c0e43?auto=format&fit=crop&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
          maskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />
      
      {/* Water Ripples */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 left-0 right-0 h-full bg-blue-400/10"
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};