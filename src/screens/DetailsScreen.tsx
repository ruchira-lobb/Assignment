import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

import { RootStackParamList } from '../types/navigation';
import { useAppTheme } from '../theme/theme';
import AppButton from '../components/buttons/AppButton';
import { addToCart } from '../redux/slices/cartSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { RootState } from '../redux/store';
import { styles } from '../styles/screens/DetailsScreen.styles';

interface AppButtonProps {
  style?: StyleProp<ViewStyle>; // ✅ correct
}
type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen = () => {
  const route = useRoute<Props['route']>();
  const navigation = useNavigation();
  const { item } = route.params;
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.items.includes(item.id.toString()),
  );

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleFavorite = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id.toString()));
      showMessage({
        message: 'Removed from favorites',
        type: 'info',
        icon: 'info',
        duration: 1500,
      });
    } else {
      dispatch(addFavorite(item.id.toString()));
      showMessage({
        message: 'Added to favorites ❤️',
        type: 'success',
        icon: 'success',
        duration: 1500,
      });
    }
  }, [dispatch, isFavorite, item.id]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(item));
    showMessage({
      message: `${item.title} added to cart 🛒`,
      type: 'success',
      icon: 'success',
      duration: 1500,
    });
  }, [dispatch, item]);

  const handleBuyNow = useCallback(() => {
    dispatch(addToCart(item));
    showMessage({
      message: 'Proceeding to checkout',
      type: 'info',
      icon: 'info',
      duration: 1500,
    });
    // Navigate to cart or checkout screen
  }, [dispatch, item]);

  // Render star ratings
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Icon key={i} name="star" size={20} color="#FFC107" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half" size={20} color="#FFC107" />);
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={20} color="#FFC107" />,
        );
      }
    }
    return stars;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with back and favorite buttons */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 8,
            backgroundColor: 'transparent',
          },
        ]}
      >
        <TouchableOpacity
          onPress={handleBack}
          style={[styles.headerButton, { backgroundColor: colors.card + 'CC' }]}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleFavorite}
          style={[styles.headerButton, { backgroundColor: colors.card + 'CC' }]}
        >
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color={isFavorite ? '#FF4444' : colors.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Image */}
        <Image
          source={{ uri: item.mainImage || item.thumbNailImage }}
          style={styles.mainImage}
          resizeMode="cover"
        />

        {/* Content Container */}
        <View
          style={[
            styles.contentContainer,
            { backgroundColor: colors.background },
          ]}
        >
          {/* Title and Rating */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: colors.text }]}>
              {item.title}
            </Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderRating(item.rating)}
              </View>
              <Text style={[styles.ratingText, { color: colors.text + 'CC' }]}>
                {item.rating} ({Math.floor(Math.random() * 100) + 50} reviews)
              </Text>
            </View>
          </View>

          {/* Price and Time */}
          <View style={styles.priceTimeContainer}>
            <View style={[styles.priceCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.priceLabel, { color: colors.text + '99' }]}>
                Price
              </Text>
              <Text style={[styles.priceValue, { color: colors.primary }]}>
                ₹{item.price}
              </Text>
            </View>

            <View style={[styles.timeCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.timeLabel, { color: colors.text + '99' }]}>
                Prep Time
              </Text>
              <View style={styles.timeValueContainer}>
                <Icon name="timer" size={18} color={colors.primary} />
                <Text style={[styles.timeValue, { color: colors.primary }]}>
                  {item.prepTimeMins} mins
                </Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          <View style={styles.tagsSection}>
            <View style={styles.tagsContainer}>
              {/* Category Tag */}
              <View
                style={[styles.tag, { backgroundColor: colors.primary + '20' }]}
              >
                <Icon name="restaurant" size={14} color={colors.primary} />
                <Text style={[styles.tagText, { color: colors.primary }]}>
                  {item.category}
                </Text>
              </View>

              {/* Cuisine Tag */}
              <View
                style={[styles.tag, { backgroundColor: colors.primary + '20' }]}
              >
                <Icon name="public" size={14} color={colors.primary} />
                <Text style={[styles.tagText, { color: colors.primary }]}>
                  {item.cuisine}
                </Text>
              </View>

              {/* Veg/Non-Veg Tag */}
              <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: item.isVeg ? '#4CAF5020' : '#FF444420',
                  },
                ]}
              >
                <Icon
                  name={item.isVeg ? 'grass' : 'pets'}
                  size={14}
                  color={item.isVeg ? '#4CAF50' : '#FF4444'}
                />
                <Text
                  style={[
                    styles.tagText,
                    { color: item.isVeg ? '#4CAF50' : '#FF4444' },
                  ]}
                >
                  {item.isVeg ? 'Pure Veg' : 'Non-Veg'}
                </Text>
              </View>
            </View>

            {/* Additional Tags */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.additionalTagsScroll}
            >
              <View style={styles.additionalTagsContainer}>
                {item.tags.map((tag, index) => (
                  <View
                    key={index}
                    style={[
                      styles.additionalTag,
                      { backgroundColor: colors.text + '10' },
                    ]}
                  >
                    <Text
                      style={[styles.additionalTagText, { color: colors.text }]}
                    >
                      #{tag}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Description
            </Text>
            <Text style={[styles.description, { color: colors.text + 'CC' }]}>
              {item.description}
            </Text>
          </View>

          {/* Nutritional Info (Optional - can be added if data available) */}
          <View style={styles.nutritionSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Nutritional Information
            </Text>
            <View style={styles.nutritionGrid}>
              {[
                { label: 'Calories', value: '320 kcal' },
                { label: 'Protein', value: '12g' },
                { label: 'Carbs', value: '45g' },
                { label: 'Fat', value: '18g' },
              ].map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.nutritionItem,
                    { backgroundColor: colors.card },
                  ]}
                >
                  <Text style={[styles.nutritionValue, { color: colors.text }]}>
                    {item.value}
                  </Text>
                  <Text
                    style={[
                      styles.nutritionLabel,
                      { color: colors.text + '99' },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Bottom Padding */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.card,
            paddingBottom: insets.bottom + 16,
            borderTopColor: colors.text + '10',
          },
        ]}
      >
        <AppButton
          title="Add to Cart"
          onPress={handleAddToCart}
          backgroundColor={colors.primary}
          style={{
            flex: 1,
            height: 48,
            borderWidth: 1,
            borderColor: colors.primary,
            marginRight: 8,
          }}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;
