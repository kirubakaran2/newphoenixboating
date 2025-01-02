import { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, X } from 'lucide-react';
import { MangroveBackground } from './MangroveBackground';
import { NavigationMenu } from './NavigationMenu';
import { MobileMenuButton } from './MobileMenuButton';
import logo from './logo2.png';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <MangroveBackground />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed inset-0 bg-gradient-to-b from-blue-900/95 to-blue-950/95 backdrop-blur-sm"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white"
              >
                <X size={32} />
              </button>
              
              <div className="flex flex-col h-full items-center justify-center">
                <img src={logo} alt="New Phoenix Boating & Adventures" className="w-48 mb-8" />
                <NavigationMenu onItemClick={() => setIsOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};