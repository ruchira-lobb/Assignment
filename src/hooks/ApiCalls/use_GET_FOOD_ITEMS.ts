import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { apiClient } from '../../services/apiClient';
import { ENDPOINTS } from '../../config/endpoints';
import { FoodItem } from '../../types/food';
import { setFoodItems } from '../../redux/slices/foodSlice';

interface ApiResponse {
  record: {
    data: FoodItem[];
    meta: {
      total: number;
    };
  };
  metadata: {
    id: string;
    private: boolean;
    createdAt: string;
    name: string;
  };
}

export const use_GET_FOOD_ITEMS = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchFoodItems = useCallback(async (isRefreshing = false) => {
    // Prevent multiple simultaneous calls
    if (loading || refreshing) {
      console.log('Already fetching, skipping...');
      return;
    }

    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      console.log('CALLING GET FOOD API::');

      const response = await apiClient.get<ApiResponse>(
        ENDPOINTS.GET_FOOD_ITEMS,
      );

      const foodItems = response.data.record.data || [];
      console.log('Food items fetched:', foodItems.length);
      
      // Store in Redux - this will NOT affect favorites or cart
      dispatch(setFoodItems(foodItems));
      
    } catch (err: any) {
      setError('Something went wrong. Please try again.');
      console.error('API Error:', err);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, [dispatch, loading, refreshing]);

  const onRefresh = useCallback(async () => {
    await fetchFoodItems(true);
  }, [fetchFoodItems]);

  return {
    loading,
    error,
    refreshing,
    fetchFoodItems,
    onRefresh,
  };
};