'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFoodAnalysis } from '../app/hooks/use-food-analysis';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Sparkles, ArrowLeft } from 'lucide-react';
import FoodResults from '../app/components/FoodResult';
import FoodUploadForm from '../app/components/FoodUploadForm';
import AnimatedBackground from '../app/components/AnimatedBackground';

export default function FoodUploadPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [showResults, setShowResults] = useState(false);
  const { uploadImage, result, isLoading, error, progress } = useFoodAnalysis();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setShowResults(false); 
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    await uploadImage(selectedFile);
  };

  useEffect(() => {
    if (result && result.isFood) {
      setShowResults(true);
    }
  }, [result]);

  const handleBackToUpload = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <motion.header
          className="text-center py-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center space-x-3 mb-4"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="h-12 w-12 text-orange-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              FoodieAI
            </h1>
            <Sparkles className="h-12 w-12 text-red-500" />
          </motion.div>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transform any food photo into a complete recipe with AI-powered
            analysis
          </motion.p>
        </motion.header>

        <div className="container mx-auto px-4 pb-12">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="upload-section"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <FoodUploadForm
                    handleFileChange={handleFileChange}
                    handleUpload={handleUpload}
                    imagePreview={imagePreview}
                    isLoading={isLoading}
                    error={error}
                    progress={progress}
                  />

                  <AnimatePresence>
                    {result && result.isFood === false && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8"
                      >
                        <Alert className="border-orange-200 bg-orange-50">
                          <Info className="h-4 w-4 text-orange-600" />
                          <AlertTitle className="text-orange-800">
                            Not a Food Image
                          </AlertTitle>
                          <AlertDescription className="text-orange-700">
                            The uploaded image doesn&apos;t appear to be a food
                            dish. Please upload a clear image of food for recipe
                            analysis.
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="results-section"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
              >
                <motion.button
                  onClick={handleBackToUpload}
                  className="mb-8 flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-700">
                    Upload Another Image
                  </span>
                </motion.button>

                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {result && result.isFood && (
                    <FoodResults result={result} imagePreview={imagePreview} />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
