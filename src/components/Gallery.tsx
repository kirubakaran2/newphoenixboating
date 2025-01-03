import { motion } from "framer-motion";

const Gallery = () => {
  const images = [
    { url: "https://i.postimg.cc/2SFmW5SY/cus10.jpg", alt: "Customer 10" },
    { url: "https://i.postimg.cc/Cxmht1TN/cus11.jpg", alt: "Customer 11" },
    { url: "https://i.postimg.cc/139RJFTX/cus12.jpg", alt: "Customer 12" },
    { url: "https://i.postimg.cc/y6ZNdsc1/cus14.jpg", alt: "Customer 14" },
    { url: "https://i.postimg.cc/m2Wg1JyQ/cus15.jpg", alt: "Customer 15" },
    { url: "https://i.postimg.cc/hP2NR7vf/cus16.jpg", alt: "Customer 16" },
    { url: "https://i.postimg.cc/VNrxRLY5/cus17.jpg", alt: "Customer 17" },
    { url: "https://i.postimg.cc/7PMpXRy1/cus18.jpg", alt: "Customer 18" },
    { url: "https://i.postimg.cc/m2LKnSbv/cus19.jpg", alt: "Customer 19" },
    { url: "https://i.postimg.cc/T3SSpMrx/cus21.jpg", alt: "Customer 21" },
    { url: "https://i.postimg.cc/nLDWmRkD/cus22.jpg", alt: "Customer 22" },
    { url: "https://i.postimg.cc/NMvzk6JP/cus23.jpg", alt: "Customer 23" },
    { url: "https://i.postimg.cc/v8zN56W3/cust1.jpg", alt: "Customer 1" },
    { url: "https://i.postimg.cc/mrCdkcL3/cust2.jpg", alt: "Customer 2" },
    { url: "https://i.postimg.cc/xTpp4Dpm/cust3.jpg", alt: "Customer 3" },
    { url: "https://i.postimg.cc/4xK2CLjS/cust4.jpg", alt: "Customer 4" },
    { url: "https://i.postimg.cc/qRr13kqP/cust5.jpg", alt: "Customer 5" },
    { url: "https://i.postimg.cc/W37XmQJh/cust6.jpg", alt: "Customer 6" },
    { url: "https://i.postimg.cc/vHKXv7DL/cust7.jpg", alt: "Customer 7" },
    { url: "https://i.postimg.cc/hvys6Tsn/cust8.jpg", alt: "Customer 8" },
    { url: "https://i.postimg.cc/c4CXYk1L/cusy9.jpg", alt: "Customer 9" }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Our Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing moments of joy and adventure on the water
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          {/* First Row - Left to Right */}
          <motion.div 
            className="flex mb-4"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...images, ...images].map((image, index) => (
              <motion.div
                key={`row1-${index}`}
                className="min-w-[300px] h-[200px] mx-2"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Second Row - Right to Left */}
          <motion.div 
            className="flex"
            animate={{
              x: [-2000, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...images, ...images].reverse().map((image, index) => (
              <motion.div
                key={`row2-${index}`}
                className="min-w-[300px] h-[200px] mx-2"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
