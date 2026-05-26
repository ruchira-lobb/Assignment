import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favoritesSlice';
import foodReducer from './slices/foodSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    food: foodReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
