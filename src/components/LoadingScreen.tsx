import { motion } from 'framer-motion';
import { Anchor } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-900 to-blue-600"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Anchor size={64} className="text-white" />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-white text-xl font-light">Setting Sail...</p>
      </motion.div>
    </motion.div>
  );
};