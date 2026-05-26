import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppTheme } from '../../theme/theme';

interface Props {
  onPress: () => void;
  color?: string;
  size?: number;
}

const CartIcon: React.FC<Props> = ({ onPress, color, size = 24 }) => {
  const colors = useAppTheme();
  const { totalItems } = useSelector((state: RootState) => state.cart);

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="shopping-cart" size={size} color={color || colors.text} />
      {totalItems > 0 && (
        <View style={[styles.badge, { backgroundColor: colors.primary }]}>
          <Text style={styles.badgeText}>
            {totalItems > 9 ? '9+' : totalItems}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CartIcon;
