import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  FAVORITES: '@lobb_favorites',
  CART: '@lobb_cart',
};

// In-memory fallback
const memoryStorage = {
  favorites: [] as string[],
  cart: { items: [], totalItems: 0, totalPrice: 0 },
};

export const storage = {
  // Favorites
  async getFavorites(): Promise<string[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      const favorites = data ? JSON.parse(data) : [];
      memoryStorage.favorites = favorites;
      return favorites;
    } catch (error) {
      console.error('Error loading favorites:', error);
      return memoryStorage.favorites;
    }
  },

  async saveFavorites(favorites: string[]): Promise<void> {
    try {
      memoryStorage.favorites = favorites;
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  // Cart
  async getCart() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CART);
      const cart = data ? JSON.parse(data) : { items: [], totalItems: 0, totalPrice: 0 };
      memoryStorage.cart = cart;
      return cart;
    } catch (error) {
      console.error('Error loading cart:', error);
      return memoryStorage.cart;
    }
  },

  async saveCart(cart: any): Promise<void> {
    try {
      memoryStorage.cart = cart;
      await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  },

  async clearAll(): Promise<void> {
    try {
      memoryStorage.favorites = [];
      memoryStorage.cart = { items: [], totalItems: 0, totalPrice: 0 };
      await AsyncStorage.removeItem(STORAGE_KEYS.FAVORITES);
      await AsyncStorage.removeItem(STORAGE_KEYS.CART);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};