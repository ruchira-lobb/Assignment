import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedCategory } from '../../redux/slices/foodSlice';
import { useAppTheme } from '../../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Map categories to icons
const categoryIcons: { [key: string]: string } = {
  All: 'restaurant-menu',
  Breakfast: 'free-breakfast',
  'Main Course': 'lunch-dining',
  Snacks: 'bakery-dining',
  Beverages: 'local-cafe',
  Desserts: 'cake',
  'Fast Food': 'fastfood',
};

const QuickFilters = () => {
  const colors = useAppTheme();
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.food,
  );

  const handleCategoryPress = (category: string) => {
    dispatch(
      setSelectedCategory(category === selectedCategory ? null : category),
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterChip,
              {
                backgroundColor:
                  selectedCategory === category ? colors.primary : colors.card,
                borderColor: colors.text + '20',
              },
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Icon
              name={categoryIcons[category] || 'restaurant'}
              size={18}
              color={selectedCategory === category ? '#fff' : colors.text}
            />
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedCategory === category ? '#fff' : colors.text,
                },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default QuickFilters;
