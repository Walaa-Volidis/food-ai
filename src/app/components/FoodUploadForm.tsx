'use client';

import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Sparkles, AlertCircle } from 'lucide-react';
import LoadingAnimation from './LoadingAnimation';

interface FoodUploadFormProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  imagePreview: string | null;
  isLoading: boolean;
  error: string | null;
  progress: number;
}

const FoodUploadForm: React.FC<FoodUploadFormProps> = ({
  handleFileChange,
  handleUpload,
  imagePreview,
  isLoading,
  error,
  progress,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        // Create a proper FileList-like object
        const fileList = {
          0: file,
          length: 1,
          item: (index: number) => (index === 0 ? file : null),
          [Symbol.iterator]: function* () {
            yield file;
          },
        } as FileList;

        const event = {
          target: { files: fileList },
        } as React.ChangeEvent<HTMLInputElement>;
        handleFileChange(event);
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className={`
            relative border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer
            transition-all duration-300 group overflow-hidden
            ${
              imagePreview
                ? 'border-green-300 bg-green-50'
                : 'border-orange-300 bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <AnimatePresence mode="wait">
            {!imagePreview ? (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Upload className="mx-auto h-16 w-16 text-orange-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Upload Your Food Image
                  </h3>
                  <p className="text-gray-500">
                    Drag and drop or click to select a delicious food photo
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Supports JPG, PNG, WebP
                  </p>
                </div>
                <motion.div
                  className="flex justify-center space-x-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Camera className="h-5 w-5 text-orange-400" />
                  <Sparkles className="h-5 w-5 text-red-400" />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="image-preview"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-4"
              >
                <motion.img
                  src={imagePreview}
                  alt="Food preview"
                  className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg"
                  layoutId="food-image"
                />
                <div className="flex items-center justify-center space-x-2 text-green-600">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Perfect! Ready to analyze</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.button
          className={`
            px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg
            transition-all duration-300 disabled:cursor-not-allowed
            ${
              imagePreview && !isLoading
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-orange-200'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
          onClick={handleUpload}
          disabled={!imagePreview || isLoading}
          whileHover={imagePreview && !isLoading ? { scale: 1.05 } : {}}
          whileTap={imagePreview && !isLoading ? { scale: 0.95 } : {}}
        >
          <motion.div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>
              {isLoading ? 'Analyzing Magic...' : 'Discover Recipe & Nutrition'}
            </span>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingAnimation progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
          >
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodUploadForm;
