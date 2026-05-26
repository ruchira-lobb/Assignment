import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { showMessage } from 'react-native-flash-message';
import { styles } from '../styles/screens/CartScreen.styles';

import { RootState } from '../redux/store';
import {
  addToCart,
  removeFromCart,
  clearCart,
} from '../redux/slices/cartSlice';
import { useAppTheme } from '../theme/theme';
import AppButton from '../components/buttons/AppButton';
import { RootStackParamList } from '../types/navigation';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

// Checkout Success Modal Component
const CheckoutSuccessModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const colors = useAppTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.successIconContainer,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <Icon name="check-circle" size={60} color={colors.primary} />
          </View>

          <Text style={[styles.successTitle, { color: colors.text }]}>
            Order Placed Successfully!
          </Text>

          <Text style={[styles.successMessage, { color: colors.text + 'CC' }]}>
            Thank you for your order. Your food will be delivered soon.
          </Text>

          <AppButton
            title="Continue Shopping"
            onPress={onClose}
            backgroundColor={colors.primary}
            style={styles.modalButton}
          />
        </View>
      </View>
    </Modal>
  );
};

// Cart Item Component
const CartItem = ({ item }: { item: any }) => {
  const colors = useAppTheme();
  const dispatch = useDispatch();

  return (
    <View style={[styles.cartItem, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.thumbNailImage }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text
          style={[styles.itemTitle, { color: colors.text }]}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          ₹{item.price}
        </Text>

        <View style={styles.vegContainer}>
          <Text style={{ color: item.isVeg ? '#4CAF50' : '#FF4444' }}>
            {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
          </Text>
        </View>
      </View>

      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            { backgroundColor: colors.primary + '20' },
          ]}
          onPress={() => dispatch(removeFromCart(item.id))}
        >
          <Icon name="remove" size={18} color={colors.primary} />
        </TouchableOpacity>

        <Text style={[styles.quantityText, { color: colors.text }]}>
          {item.quantity}
        </Text>

        <TouchableOpacity
          style={[
            styles.quantityButton,
            { backgroundColor: colors.primary + '20' },
          ]}
          onPress={() => dispatch(addToCart(item))}
        >
          <Icon name="add" size={18} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartScreen = () => {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useDispatch();

  const { items, totalItems, totalPrice } = useSelector(
    (state: RootState) => state.cart,
  );
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            dispatch(clearCart());
            showMessage({
              message: 'Cart cleared',
              type: 'info',
              icon: 'info',
            });
          },
        },
      ],
    );
  };

  const handleCheckout = () => {
    // Show success modal
    setShowCheckoutModal(true);

    // Clear cart after successful checkout
    setTimeout(() => {
      dispatch(clearCart());
    }, 500);
  };

  const handleCloseModal = () => {
    setShowCheckoutModal(false);
    navigation.navigate('MainTabs');
  };

  // Empty cart view
  if (items.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            My Cart
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconContainer,
              { backgroundColor: colors.primary + '20' },
            ]}
          >
            <Icon name="shopping-cart" size={60} color={colors.primary} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            Your cart is empty
          </Text>
          <Text style={[styles.emptyMessage, { color: colors.text + '99' }]}>
            Looks like you haven't added anything to your cart yet
          </Text>
          <AppButton
            title="Browse Menu"
            onPress={() => navigation.navigate('MainTabs')}
            backgroundColor={colors.primary}
            style={styles.browseButton}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Cart ({totalItems})
        </Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Icon name="delete-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Summary */}
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
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Total Items:
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {totalItems}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.text }]}>
            Total Price:
          </Text>
          <Text style={[styles.totalPrice, { color: colors.primary }]}>
            ₹{totalPrice}
          </Text>
        </View>

        <AppButton
          title="Proceed to Checkout"
          onPress={handleCheckout}
          backgroundColor={colors.primary}
          style={styles.checkoutButton}
        />
      </View>

      {/* Checkout Success Modal */}
      <CheckoutSuccessModal
        visible={showCheckoutModal}
        onClose={handleCloseModal}
      />
    </View>
  );
};

export default CartScreen;
