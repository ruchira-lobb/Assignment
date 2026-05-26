export interface FoodItem {
  id: number;
  title: string;
  rating: number;
  category: string;
  cuisine: string;
  tags: string[];
  thumbNailImage: string;
  mainImage: string;
  description: string;
  price: number;
  prepTimeMins: number;
  isVeg: boolean;
}