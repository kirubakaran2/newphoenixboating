import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const MobileMenuButton = ({ isOpen, onClick }: MobileMenuButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed top-4 right-4 z-50 md:hidden bg-blue-600 p-2 rounded-full shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Menu className="text-white" size={24} />
    </motion.button>
  );
};