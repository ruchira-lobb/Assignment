import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { setSearchQuery } from '../redux/slices/foodSlice';
import { useAppTheme } from '../theme/theme';
import FoodCard from '../components/cards/FoodCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import { FoodItem } from '../types/food';
import { RootStackParamList } from '../types/navigation';

type SearchScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Search'
>;

const SearchScreen = () => {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const dispatch = useDispatch();

  const [localSearch, setLocalSearch] = useState('');

  const favorites = useSelector((state: RootState) => state.favorites.items);
  const { items, searchQuery } = useSelector((state: RootState) => state.food);

  // Filter items based on search
  const searchResults = items.filter(item => {
    const query = localSearch.toLowerCase().trim();
    if (!query) return false;

    return (
      item.title.toLowerCase().includes(query) ||
      item.cuisine.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query))
    );
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

  const handleBuyNow = useCallback(() => {
    showMessage({
      message: 'Order placed successfully 🛒',
      type: 'success',
    });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: FoodItem }) => (
      <FoodCard
        item={item}
        isFavorite={favorites.includes(item.id.toString())}
        onToggleFavorite={() => toggleFavorite(item.id)}
        onViewDetails={() => handleViewDetails(item)}
        onBuyNow={handleBuyNow}
      />
    ),
    [favorites, toggleFavorite, handleViewDetails, handleBuyNow],
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with search input */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.card,
            paddingTop: insets.top,
            borderBottomColor: colors.text + '20',
          },
        ]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.background,
                borderColor: colors.text + '20',
              },
            ]}
          >
            <Icon name="search" size={20} color={colors.text + '80'} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search dishes, cuisines..."
              placeholderTextColor={colors.text + '60'}
              value={localSearch}
              onChangeText={setLocalSearch}
              autoFocus
            />
            {localSearch.length > 0 && (
              <TouchableOpacity onPress={() => setLocalSearch('')}>
                <Icon name="close" size={20} color={colors.text + '80'} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Search results */}
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
          paddingTop: 80 + insets.top,
        }}
        renderItem={renderItem}
        ListEmptyComponent={
          localSearch.length > 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="search-off" size={48} color={colors.text + '40'} />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                No results found for "{localSearch}"
              </Text>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Icon name="search" size={48} color={colors.text + '40'} />
              <Text style={[styles.emptyText, { color: colors.text }]}>
                Start typing to search
              </Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 1,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
});

export default SearchScreen;
