'use client';

import { useState, useEffect } from 'react';
import { FoodAnalysisResult } from '../types/Food';

export function useFoodAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prevProgress + 5;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const uploadImage = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
      }

      const data: FoodAnalysisResult = await response.json();
      setResult(data);
    } catch (error) {
      setError('Failed to analyze image');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadImage,
    isLoading,
    result,
    error,
    progress,
  };
}
