type Difficulty = 'easy' | 'medium' | 'hard';
export type FoodDetails = {
  isFood: true;
  dishName: string;
  cuisine: string;
  difficulty: Difficulty;
  cookingTime: string;
  servings: string;
  ingredients: string[];
  instructions: string[];
  nutritionInfo: string;
};

export type FoodAnalysisResult =
  | ({ isFood: true } & FoodDetails)
  | { isFood: false };
