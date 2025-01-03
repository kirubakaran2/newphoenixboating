import { motion } from "framer-motion";
import img1 from '../components/images/cus10.jpg';
import img2 from '../components/images/cus11.jpg';
import img3 from '../components/images/cus12.jpg';
import img4 from '../components/images/cus14.jpg';
import img5 from '../components/images/cus15.jpg';
import img6 from '../components/images/cus16.jpg';
import img7 from '../components/images/cus17.jpg';
import img8 from '../components/images/cus18.jpg';
import img9 from '../components/images/cus19.jpg';
import img10 from '../components/images/cus20.jpg';
import img11 from '../components/images/cus21.jpg';
import img12 from '../components/images/cus22.jpg';
import img13 from '../components/images/cus23.jpg';
import img14 from '../components/images/cus24.jpg';
import img15 from '../components/images/cus25.jpg';
import img17 from '../components/images/cus27.jpg';
const Gallery = () => {
  const images = [
    { url: img1, alt: "Customer 10" },
    { url: img2, alt: "Customer 11" },
    { url: img3, alt: "Customer 12" },
    { url: img4, alt: "Customer 14" },
    { url: img5, alt: "Customer 15" },
    { url: img6, alt: "Customer 16" },
    { url: img7, alt: "Customer 17" },
    { url: img8, alt: "Customer 18" },
    { url: img9, alt: "Customer 19" },
    { url: img17, alt: "Customer 27" },
    { url: img10, alt: "Customer 20" },
    { url: img11, alt: "Customer 21" },
    { url: img12, alt: "Customer 22" },
    { url: img13, alt: "Customer 23" },
    { url: img14, alt: "Customer 24" },
    { url: img15, alt: "Customer 25" },
   
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

        </div>
      </div>
    </section>
  );
};

export default Gallery;
