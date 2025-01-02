import { motion } from 'framer-motion';
import { Anchor, Ship, Compass, Waves, Wind } from 'lucide-react';

export const FloatingElements = () => {
  const floatingElements = [
    {
      icon: <Ship size={48} />,
      position: { top: '20%', left: '10%' },
      animation: {
        x: [0, 20, 0],
        y: [0, -10, 0],
        rotate: [0, 5, 0],
      },
      duration: 8,
    },
    {
      icon: <Anchor size={36} />,
      position: { top: '60%', right: '15%' },
      animation: {
        x: [0, -20, 0],
        y: [0, 15, 0],
        rotate: [0, -8, 0],
      },
      duration: 6,
    },
    {
      icon: <Compass size={42} />,
      position: { top: '40%', right: '30%' },
      animation: {
        x: [0, 15, 0],
        y: [0, -15, 0],
        rotate: [0, 360],
      },
      duration: 10,
      ease: "linear"
    },
    {
      icon: <Waves size={38} />,
      position: { bottom: '20%', left: '25%' },
      animation: {
        x: [0, 10, 0],
        y: [0, 8, 0],
        scale: [1, 1.1, 1],
      },
      duration: 5,
    },
    {
      icon: <Wind size={40} />,
      position: { top: '30%', right: '10%' },
      animation: {
        x: [-10, 10, -10],
        opacity: [0.1, 0.3, 0.1],
        scale: [0.9, 1.1, 0.9],
      },
      duration: 7,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-blue-500/20 hover:text-blue-600/30 transition-colors"
          animate={element.animation}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: element.ease || "easeInOut",
          }}
          style={element.position}
          whileHover={{ scale: 1.1 }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};