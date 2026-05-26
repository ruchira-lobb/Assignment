import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFavorites } from '../redux/slices/favoritesSlice';
import { setCart } from '../redux/slices/cartSlice';
import { storage } from '../utils/storage';

export const useInitializeStore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        // Load favorites
        const favorites = await storage.getFavorites();
        dispatch(setFavorites(favorites));

        // Load cart
        const cart = await storage.getCart();
        dispatch(setCart(cart));
      } catch (error) {
        console.error('Error loading persisted data:', error);
      }
    };

    loadPersistedData();
  }, [dispatch]);
};