import { FoodItem } from './food';

export type RootStackParamList = {
  MainTabs: undefined;
  Details: { item: FoodItem };
  Search: undefined;
  Cart: undefined;
  Info: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Favorites: undefined;
  Info: undefined; 
};