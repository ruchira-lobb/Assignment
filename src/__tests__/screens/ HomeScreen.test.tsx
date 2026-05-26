import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../screens/HomeScreen';
import { store } from '../../redux/store';

// Mock the hooks and modules
jest.mock('../../src/hooks/ApiCalls/use_GET_FOOD_ITEMS', () => ({
  use_GET_FOOD_ITEMS: () => ({
    data: [],
    loading: true,
    error: null,
    refreshing: false,
    onRefresh: jest.fn(),
    fetchFoodItems: jest.fn(),
  }),
}));

jest.mock('react-native-flash-message', () => 'FlashMessage');
jest.mock('../../src/theme/theme', () => ({
  useAppTheme: () => ({
    background: '#ffffff',
    card: '#f5f5f5',
    text: '#000000',
    primary: '#007AFF',
  }),
}));

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  // Test 1: Loading state
  it('should show loading skeleton when loading', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    // You can add testID to your FoodCardSkeleton component
    expect(getByTestId('food-card-skeleton')).toBeTruthy();
  });

  // Test 2: Empty state
  it('should show empty state when no items', async () => {
    // Override mock for this test
    jest.mock('../../src/hooks/ApiCalls/use_GET_FOOD_ITEMS', () => ({
      use_GET_FOOD_ITEMS: () => ({
        data: [],
        loading: false,
        error: null,
        refreshing: false,
        onRefresh: jest.fn(),
        fetchFoodItems: jest.fn(),
      }),
    }));

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('No food items available 🍽')).toBeTruthy();
    });
  });

  // Test 3: Error state
  it('should show error message when API fails', async () => {
    jest.mock('../../src/hooks/ApiCalls/use_GET_FOOD_ITEMS', () => ({
      use_GET_FOOD_ITEMS: () => ({
        data: [],
        loading: false,
        error: 'Failed to load',
        refreshing: false,
        onRefresh: jest.fn(),
        fetchFoodItems: jest.fn(),
      }),
    }));

    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Failed to load')).toBeTruthy();
    });
  });
});
