import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../theme/theme';

interface Props {
  isFavorite: boolean;
  onPress: () => void;
}

const FavoriteIcon: React.FC<Props> = ({ isFavorite, onPress }) => {
  const colors = useAppTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{isFavorite ? '❤️' : '🤍'}</Text>
    </TouchableOpacity>
  );
};

export default FavoriteIcon;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 6,
    borderRadius: 20,
  },
  icon: {
    fontSize: 18,
  },
});
