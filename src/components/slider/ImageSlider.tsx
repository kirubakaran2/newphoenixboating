import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Preload images
const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
  return url;
};

const images = [
  {
    url: "https://i.postimg.cc/qBsZnFtx/mangrove2.jpg?w=800&auto=format",
    title: "Mangrove Forest",
    preload: preloadImage("https://i.postimg.cc/qBsZnFtx/mangrove2.jpg?w=800&auto=format")
  },
  {
    url: "https://i.postimg.cc/1zTw8yc5/arikamedu2.png?w=800&auto=format",
    title: "Arikamedu",
    preload: preloadImage("https://i.postimg.cc/1zTw8yc5/arikamedu2.png?w=800&auto=format")
  },
  {
    url: "https://pondymarinaboathouse.com/wp-content/uploads/2024/03/DSC07276.jpg",
    title: "Fishing Harbour",
    preload: preloadImage("https://pondymarinaboathouse.com/wp-content/uploads/2024/03/DSC07276.jpg")
  }
];


export const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[currentIndex].url})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/60">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-20 left-0 right-0 text-center text-white"
              >
                <h2 className="text-4xl font-bold ">{images[currentIndex].title}</h2>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 bottom-32 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    </div>
  );
};
