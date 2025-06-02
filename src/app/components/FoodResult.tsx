'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  ChefHat,
  Globe,
  Sparkles,
  Heart,
  CheckCircle2,
  Utensils,
} from 'lucide-react';
import { FoodAnalysisResult } from '../types/Food';

interface FoodResultsProps {
  result: FoodAnalysisResult & { isFood: true };
  imagePreview: string | null;
}

const FoodResults: React.FC<FoodResultsProps> = ({ result, imagePreview }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header with Image and Title */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-8 overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="h-8 w-8 text-orange-400" />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
          {imagePreview && (
            <motion.div layoutId="food-image" className="flex-shrink-0">
              <img
                src={imagePreview}
                alt="Food preview"
                className="w-48 h-48 object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          )}

          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-4xl font-bold text-gray-800 mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {result.dishName}
            </motion.h1>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.div
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Globe className="h-5 w-5 text-blue-500" />
                <span className="font-medium">{result.cuisine}</span>
              </motion.div>

              <motion.div
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${getDifficultyColor(
                  result.difficulty
                )}`}
                whileHover={{ scale: 1.05 }}
              >
                <ChefHat className="h-5 w-5" />
                <span className="font-medium">{result.difficulty}</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="h-5 w-5 text-purple-500" />
                <span className="font-medium">{result.cookingTime}</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="h-5 w-5 text-green-500" />
                <span className="font-medium">{result.servings} servings</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ingredients Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Utensils className="h-8 w-8 text-orange-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">Ingredients</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {result.ingredients.map((ingredient, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
            >
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{ingredient}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Instructions Section */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChefHat className="h-8 w-8 text-red-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">
            Cooking Instructions
          </h2>
        </div>

        <div className="space-y-4">
          {result.instructions.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex space-x-4 p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:from-orange-50 hover:to-red-50 transition-all duration-300"
            >
              <motion.div
                className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm"
                whileHover={{ scale: 1.1 }}
              >
                {idx + 1}
              </motion.div>
              <p className="text-gray-700 leading-relaxed">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Nutrition Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 shadow-lg border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heart className="h-8 w-8 text-green-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800">
            Nutrition Information
          </h2>
        </div>

        <motion.div
          className="bg-white rounded-2xl p-6 shadow-md"
          whileHover={{ scale: 1.02 }}
        >
          <p className="text-gray-700 leading-relaxed text-lg">
            {result.nutritionInfo}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FoodResults;
