'use client';

import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  progress: number;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ progress }) => {
  const foodEmojis = ['🍕', '🍔', '🍜', '🥗', '🍰', '🍱', '🌮', '🍣'];
  
  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {/* Cooking Animation */}
      <div className="relative">
        <motion.div
          className="text-6xl"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          👨‍🍳
        </motion.div>
        
        {/* Floating ingredients */}
        {foodEmojis.slice(0, 4).map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl"
            style={{
              top: `${-20 + index * 10}px`,
              left: `${60 + index * 15}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.7, 1, 0.7],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
        
        {/* Cooking steam/sparkles */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute -top-6 left-1/4 text-xl"
          animate={{
            y: [0, -12, 0],
            opacity: [0.4, 0.9, 0.4],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        >
          💫
        </motion.div>
        
        <motion.div
          className="absolute -top-6 right-1/4 text-xl"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        >
          ⭐
        </motion.div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-64 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 relative"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
      
      {/* Progress Text */}
      <motion.div
        className="text-lg font-semibold text-gray-700 text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.span
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Analyzing your delicious food... {progress}%
        </motion.span>
      </motion.div>
      
      {/* Cooking Steps Animation */}
      <div className="flex space-x-6">
        {[
          { icon: '🔍', label: 'Scanning' },
          { icon: '🧠', label: 'Analyzing' },
          { icon: '📝', label: 'Generating' }
        ].map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center space-y-2"
            animate={{
              scale: progress > index * 33 ? [1, 1.3, 1] : 1,
              opacity: progress > index * 33 ? 1 : 0.3,
            }}
            transition={{
              duration: 0.8,
              repeat: progress > index * 33 ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <div className="text-3xl">{step.icon}</div>
            <motion.div
              className={`text-sm font-medium ${
                progress > index * 33 ? 'text-orange-600' : 'text-gray-400'
              }`}
              animate={progress > index * 33 ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              {step.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Floating cooking utensils */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 text-2xl opacity-20"
          animate={{
            rotate: [0, 15, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🥄
        </motion.div>
        
        <motion.div
          className="absolute top-1/3 right-1/4 text-2xl opacity-20"
          animate={{
            rotate: [0, -12, 12, 0],
            y: [0, 8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          🍴
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 left-1/3 text-2xl opacity-20"
          animate={{
            rotate: [0, 20, -20, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          🔪
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
