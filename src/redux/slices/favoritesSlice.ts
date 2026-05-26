import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

interface FavoriteState {
  items: string[];
}

const initialState: FavoriteState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        // Save to storage after adding
        storage.saveFavorites(state.items);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(id => id !== action.payload);
      // Save to storage after removing
      storage.saveFavorites(state.items);
    },
    clearFavorites: (state) => {
      state.items = [];
      storage.saveFavorites([]);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;