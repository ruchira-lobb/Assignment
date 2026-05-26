import React, { useRef, useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { useAppTheme } from '../theme/theme';
import { use_GET_FOOD_ITEMS } from '../hooks/ApiCalls/use_GET_FOOD_ITEMS';
import FoodCard from '../components/cards/FoodCard';
import CustomHeader from '../components/navigation/CustomHeader';
import QuickFilters from '../components/filters/QuickFilters';
import { showMessage } from 'react-native-flash-message';
import { FoodItem } from '../types/food';
import { RootStackParamList } from '../types/navigation';
import FoodCardSkeleton from '../components/loaders/FoodCardSkeleton';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const HomeScreen = () => {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Redux state
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const { filteredItems, items, searchQuery, selectedCategory } = useSelector(
    (state: RootState) => state.food,
  );

  // Local state
  const [isRefreshingFromLogo, setIsRefreshingFromLogo] = useState(false);

  // API hook - now doesn't return data
  const { loading, error, refreshing, onRefresh, fetchFoodItems } =
    use_GET_FOOD_ITEMS();

  // Initial fetch
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const scrollY = useSharedValue(0);
  const flatListRef = useRef<Animated.FlatList<FoodItem>>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const toggleFavorite = useCallback(
    (id: number) => {
      if (favorites.includes(id.toString())) {
        dispatch(removeFavorite(id.toString()));
        showMessage({
          message: 'Removed from favorites',
          type: 'info',
        });
      } else {
        dispatch(addFavorite(id.toString()));
        showMessage({
          message: 'Added to favorites ❤️',
          type: 'success',
        });
      }
    },
    [dispatch, favorites],
  );

  const handleViewDetails = useCallback(
    (item: FoodItem) => {
      navigation.navigate('Details', { item });
    },
    [navigation],
  );

  const handleLogoPress = useCallback(async () => {
    setIsRefreshingFromLogo(true);
    // Scroll to top
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
    await fetchFoodItems();
    setIsRefreshingFromLogo(false);
  }, [fetchFoodItems]);

  const handleRefresh = useCallback(async () => {
    await onRefresh();
  }, [onRefresh]);

  const handleSearchPress = useCallback(() => {
    // Navigate to search screen
    navigation.navigate('Search');
  }, [navigation]);

  const handleCartPress = useCallback(() => {
    navigation.navigate('Cart'); // Navigate to Cart screen
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: FoodItem }) => (
      <FoodCard
        item={item}
        isFavorite={favorites.includes(item.id.toString())}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onViewDetails={() => handleViewDetails(item)}
      />
    ),
    [favorites, toggleFavorite, handleViewDetails],
  );

  // Show skeleton when loading from logo press OR initial load with no data
  if ((loading && items.length === 0) || isRefreshingFromLogo) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CustomHeader
          scrollY={scrollY}
          onLogoPress={handleLogoPress}
          onSearchPress={handleSearchPress}
          onInfoPress={() =>
            showMessage({ message: 'Info pressed', type: 'info' })
          }
          onCartPress={handleCartPress}
        />
        <FoodCardSkeleton count={5} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader
        scrollY={scrollY}
        onLogoPress={handleLogoPress}
        onSearchPress={handleSearchPress}
        onInfoPress={() =>
          showMessage({ message: 'Info pressed', type: 'info' })
        }
        onCartPress={handleCartPress}
      />

      <Animated.FlatList
        ref={flatListRef}
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingTop: 65 + insets.top,
          paddingBottom: 80 + insets.bottom,
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <QuickFilters />
          </View>
        }
        ListEmptyComponent={
          !loading && filteredItems.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={{ color: colors.text, fontSize: 16 }}>
                {searchQuery || selectedCategory
                  ? 'No items match your search'
                  : 'No food items available 🍽'}
              </Text>
              {(searchQuery || selectedCategory) && (
                <Text style={{ color: colors.text + '80', marginTop: 8 }}>
                  Try adjusting your filters
                </Text>
              )}
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});
