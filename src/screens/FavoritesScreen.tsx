import React, { useRef, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { removeFavorite } from '../redux/slices/favoritesSlice';
import { useAppTheme } from '../theme/theme';
import { use_GET_FOOD_ITEMS } from '../hooks/ApiCalls/use_GET_FOOD_ITEMS';
import FoodCard from '../components/cards/FoodCard';
import CustomHeader from '../components/navigation/CustomHeader';
import { showMessage } from 'react-native-flash-message';
import { FoodItem } from '../types/food';
import { RootStackParamList } from '../types/navigation';
import FoodCardSkeleton from '../components/loaders/FoodCardSkeleton';

type FavoritesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

const FavoritesScreen = () => {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const dispatch = useDispatch();
  
  // Get favorites from Redux
  const favorites = useSelector((state: RootState) => state.favorites.items);
  // Get all food items from Redux
  const allFoodItems = useSelector((state: RootState) => state.food.items);
  
  // API hook for refreshing
  const { loading, refreshing, onRefresh, fetchFoodItems } = use_GET_FOOD_ITEMS();

  // Fetch data if not available
  useEffect(() => {
    if (allFoodItems.length === 0) {
      fetchFoodItems();
    }
  }, [allFoodItems.length, fetchFoodItems]);

  // Filter favorite items
  const favoriteItems = allFoodItems.filter(item =>
    favorites.includes(item.id.toString()),
  );

  const scrollY = useSharedValue(0);
  const flatListRef = useRef<FlatList<FoodItem>>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const toggleFavorite = useCallback(
    (id: number) => {
      dispatch(removeFavorite(id.toString()));
      showMessage({
        message: 'Removed from favorites',
        type: 'info',
      });
    },
    [dispatch],
  );

  const handleViewDetails = useCallback(
    (item: FoodItem) => {
      navigation.navigate('Details', { item });
    },
    [navigation],
  );

  const handleBuyNow = useCallback(() => {
    showMessage({
      message: 'Order placed successfully 🛒',
      type: 'success',
    });
  }, []);

  const handleSearchPress = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  const handleCartPress = useCallback(() => {
    showMessage({ message: 'Cart opened', type: 'info' });
    navigation.navigate('Cart');
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: FoodItem }) => (
      <FoodCard
        item={item}
        isFavorite={true}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onViewDetails={() => handleViewDetails(item)}
        onBuyNow={handleBuyNow}
      />
    ),
    [toggleFavorite, handleViewDetails, handleBuyNow],
  );

  const ListEmptyComponent = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={{ color: colors.text, fontSize: 16 }}>
          No favorite items yet ❤️
        </Text>
        <Text style={{ color: colors.text, marginTop: 8 }}>
          Add items to favorites from the home screen
        </Text>
      </View>
    ),
    [colors.text],
  );

  // Show loading state
  if (loading && allFoodItems.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CustomHeader
          scrollY={scrollY}
          showLogo={false}
          title="Favorites"
          onSearchPress={handleSearchPress}
          onInfoPress={() => showMessage({ message: 'Info pressed', type: 'info' })}
          onCartPress={handleCartPress}
        />
        <FoodCardSkeleton count={3} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CustomHeader
        scrollY={scrollY}
        showLogo={false}
        title="Favorites"
        onSearchPress={handleSearchPress}
        onInfoPress={() => showMessage({ message: 'Info pressed', type: 'info' })}
        onCartPress={handleCartPress}
      />

      <Animated.FlatList
        ref={flatListRef}
        data={favoriteItems}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 100 + insets.top,
          paddingBottom: 80 + insets.bottom,
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
});