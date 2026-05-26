import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'; // Add this back
import { FoodItem } from '../../types/food';
import { useAppTheme } from '../../theme/theme';
import AppButton from '../buttons/AppButton';
import FavoriteIcon from './FavoriteIcon';
import { showMessage } from 'react-native-flash-message';
import { addToCart } from '../../redux/slices/cartSlice'; // Import the action

interface Props {
  item: FoodItem;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
  onBuyNow?: () => void;
}

const FoodCard: React.FC<Props> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
  onBuyNow,
}) => {
  const colors = useAppTheme();
  const dispatch = useDispatch(); // Add dispatch back

  const handleAddToCart = () => {
    // Dispatch the action to add to cart
    dispatch(addToCart(item));
    
    showMessage({
      message: `${item.title} added to cart 🛒`,
      type: 'success',
      icon: 'success',
      duration: 1500,
    });
  };

  const handleBuyNowPress = () => {
    if (onBuyNow) {
      onBuyNow();
    } else {
      // Also add to cart when buying
      dispatch(addToCart(item));
      showMessage({
        message: `Proceeding to buy ${item.title}`,
        type: 'info',
        duration: 1500,
      });
    }
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View>
        <Image
          source={{ uri: item.thumbNailImage }}
          style={styles.image}
          resizeMode="cover"
        />

        <FavoriteIcon isFavorite={isFavorite} onPress={onToggleFavorite} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>

        <View style={styles.row}>
          <Text style={[styles.price, { color: colors.primary }]}>
            ₹{item.price}
          </Text>

          <Text style={{ color: colors.text }}>
            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <AppButton
            title="Details"
            onPress={onViewDetails}
            style={{ flex: 1, marginRight: 8 }}
          />

          <AppButton
            title="Add"
            onPress={handleAddToCart}
            backgroundColor={colors.primary}
            style={{ flex: 1 }}
          />
        </View>

        {/* {onBuyNow && (
          <View style={styles.buyNowContainer}>
            <AppButton
              title="Buy Now"
              onPress={handleBuyNowPress}
              backgroundColor={colors.primary}
              style={styles.buyNowButton}
            />
          </View>
        )} */}
      </View>
    </View>
  );
};

export default FoodCard;

// Styles remain the same
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buyNowContainer: {
    marginTop: 8,
  },
  buyNowButton: {
    width: '100%',
  },
});