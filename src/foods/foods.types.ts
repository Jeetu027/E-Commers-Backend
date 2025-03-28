import { IngredientsType } from "../ingredients/ingredients.types";
import { NutritionsType } from "../nutritions/nutritions.types";

export interface FoodType {
  id?: string;
  name: string;
  description: string;
  type: string;
  time: string;
  category_id: string;
  created_by: string;
  nutrition_id?: string;
  nutrition?: NutritionsType;
  ingredients?: IngredientsType[];
}
export interface FoodTypeUpdate {
  name?: string;
  description?: string;
  type?: string;
  time?: string;
  category_id?: string;
  created_by?: string;
  nutrition_id?: string;
  nutrition?: NutritionsType;
  ingredients?: IngredientsType[];
}
