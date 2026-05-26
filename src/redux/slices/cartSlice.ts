import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodItem } from '../../types/food';
import { storage } from '../../utils/storage';

interface CartItem extends FoodItem {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartState>) => {
      state.items = action.payload.items;
      state.totalItems = action.payload.totalItems;
      state.totalPrice = action.payload.totalPrice;
    },
    addToCart: (state, action: PayloadAction<FoodItem>) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      // Update totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      // Save to storage
      storage.saveCart({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      });
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(item => item.id === action.payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }

      // Update totals
      state.totalItems = state.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      );
      state.totalPrice = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      // Save to storage
      storage.saveCart({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
      });
    },
    clearCart: state => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      // Save to storage
      storage.saveCart({
        items: [],
        totalItems: 0,
        totalPrice: 0,
      });
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
