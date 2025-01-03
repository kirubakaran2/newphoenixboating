import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const Feedback = () => {
  const reviews = [
    {
      name: "Vishl D",
      rating: 5,
      comment: "Superb experience and highly recommended",
      image: "https://ui-avatars.com/api/?name=vishalD&background=random"
    },
    {
      name: "moola chinni",
      rating: 5,
      comment: "It was amazing journey on the boat, guider was so sweet, they covered almost 5 place through boat, it was amazing",
      image: "https://ui-avatars.com/api/?name=chinnis&background=random"
    },
    {
      name: "Lakshmi prashath k",
      rating: 5,
      comment: "Such a friendly and helpful person ,highly recommend to choose phoenix boating",
      image: "https://ui-avatars.com/api/?name=Lakshmi&background=random"
    },
    {
      name: "MohanRam", 
      rating: 4,
      comment: "Feel good experience with affordable price....",
      image: "https://ui-avatars.com/api/?name=MohanRam&background=random"
    },
    {
      name: "Jithendiran",
      rating: 5, 
      comment: "New Phoenix Boating Adventures: unforgettable experience, highly recommended, worth it!",
      image: "https://ui-avatars.com/api/?name=Jithendiran&background=random"
    },
    {
      name: "Harikrishnan",
      rating: 5,
      comment: "The boat trip was fantastic! Great crew and amazing views.",
      image: "https://ui-avatars.com/api/?name=Harikrishnan&background=random"
    },
    {
      name: "Harish",
      rating: 5,
      comment: "Perfect weekend getaway. The fishing experience was outstanding!",
      image: "https://ui-avatars.com/api/?name=Harish&background=random"
    },
    {
      name: "Vittal",
      rating: 5,
      comment: "Exceptional service and memorable journey. Can't wait to return!",
      image: "https://ui-avatars.com/api/?name=Vittal&background=random"
    },
    {
      name: "Vishnu",
      rating: 5,
      comment: "The sunset views were breathtaking. A must-try experience!",
      image: "https://ui-avatars.com/api/?name=Vishnu&background=random"
    },
  ];

  return (
    <section id="feedback" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4">Customer Feedback</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our guests have to say about their experiences with us
          </p>
          <a 
            href="https://g.page/r/CU6DdQ_DrQzKEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Write a Review
          </a>
        </motion.div>

        <div className="overflow-hidden">
          <motion.div 
            className="flex"
            animate={{
              x: [0, -3840],
            }}
            transition={{
              x: {
                repeat: Infinity,
                duration: 60,
                ease: "linear",
              },
            }}
          >
            <div className="flex gap-8 animate-scroll">
              {[...reviews, ...reviews].map((review, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg min-w-[300px]"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-blue-900">{review.name}</h3>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
