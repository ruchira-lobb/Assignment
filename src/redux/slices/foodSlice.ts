import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodItem } from '../../types/food';

interface FoodState {
  items: FoodItem[];
  filteredItems: FoodItem[];
  searchQuery: string;
  selectedCategory: string | null;
  categories: string[];
}

const initialState: FoodState = {
  items: [],
  filteredItems: [],
  searchQuery: '',
  selectedCategory: null,
  categories: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodItems: (state, action: PayloadAction<FoodItem[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;

      // Extract unique categories
      const categories = [
        ...new Set(action.payload.map(item => item.category)),
      ];
      state.categories = ['All', ...categories];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      filterItems(state);
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      filterItems(state);
    },
    resetFilters: state => {
      state.searchQuery = '';
      state.selectedCategory = null;
      state.filteredItems = state.items;
    },
  },
});

// Helper function to filter items based on search query and category
const filterItems = (state: FoodState) => {
  let filtered = state.items;

  // Filter by search query
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase().trim();
    filtered = filtered.filter(
      item =>
        item.title.toLowerCase().includes(query) ||
        item.cuisine.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)),
    );
  }

  // Filter by category
  if (state.selectedCategory && state.selectedCategory !== 'All') {
    filtered = filtered.filter(
      item => item.category === state.selectedCategory,
    );
  }

  state.filteredItems = filtered;
};

export const {
  setFoodItems,
  setSearchQuery,
  setSelectedCategory,
  resetFilters,
} = foodSlice.actions;
export default foodSlice.reducer;
