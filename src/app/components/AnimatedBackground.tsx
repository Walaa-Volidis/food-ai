'use client';

import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50" />
      
      {/* Floating Food Icons */}
      <motion.div
        className="absolute top-20 left-10 text-6xl opacity-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🍕
      </motion.div>
      
      <motion.div
        className="absolute top-40 right-20 text-5xl opacity-10"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        🍔
      </motion.div>
      
      <motion.div
        className="absolute bottom-40 left-20 text-4xl opacity-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        🍜
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 right-10 text-5xl opacity-10"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        🥗
      </motion.div>
      
      <motion.div
        className="absolute top-60 left-1/2 text-4xl opacity-10"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        🍰
      </motion.div>
      
      <motion.div
        className="absolute top-32 right-1/3 text-3xl opacity-10"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -6, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        🌮
      </motion.div>
      
      <motion.div
        className="absolute bottom-60 left-1/3 text-4xl opacity-10"
        animate={{
          y: [0, -18, 0],
          rotate: [0, 7, 0],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      >
        🍣
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 left-16 text-3xl opacity-10"
        animate={{
          y: [0, 14, 0],
          x: [0, -8, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3.5,
        }}
      >
        🍱
      </motion.div>
      
      {/* Animated Circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-200 to-red-200 rounded-full opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.05, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/5 w-20 h-20 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-15"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.08, 0.15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-28 h-28 bg-gradient-to-r from-green-200 to-blue-200 rounded-full opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.05, 0.1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 6,
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
