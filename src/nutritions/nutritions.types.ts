export interface NutritionsType {
  id?: string;
  calories: number;
  protein: number;
  total_fat: number;
  carbohydrates: number;
  cholesterol: number;
}
export interface NutritionsTypeUpadte {
  id: string;
  calories?: number;
  protein?: number;
  total_fat?: number;
  carbohydrates?: number;
  cholesterol?: number;
}
