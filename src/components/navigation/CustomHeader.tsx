import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '../../theme/theme';
import { RootStackParamList } from '../../types/navigation';
import CartIcon from '../cart/CartIcon';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CustomHeaderProps {
  scrollY: SharedValue<number>;
  title?: string;
  showLogo?: boolean;
  onLogoPress?: () => void;
  onSearchPress?: () => void;
  onInfoPress?: () => void;
  onCartPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  scrollY,
  title,
  showLogo = true,
  onLogoPress,
  onSearchPress,
  onInfoPress,
  onCartPress,
}) => {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

  const HEADER_HEIGHT = 100;
  const HIDDEN_THRESHOLD = 50;

  const animatedStyle = useAnimatedStyle(() => {
    const translateY =
      scrollY.value > HIDDEN_THRESHOLD
        ? withTiming(-HEADER_HEIGHT, { duration: 200 })
        : withTiming(0, { duration: 200 });

    return {
      transform: [{ translateY }],
    };
  });

  const handleLogoPress = () => {
    if (onLogoPress) {
      onLogoPress();
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else {
      // Navigate to cart screen or show cart modal
      showMessage({ message: 'Cart pressed', type: 'info' });
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor: colors.card,
          paddingTop: insets.top,
          borderBottomColor: colors.text + '20',
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showLogo ? (
            <TouchableOpacity onPress={handleLogoPress}>
              <Text style={[styles.logo, { color: colors.primary }]}>Lobb</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          )}
        </View>

        {title && !showLogo && (
          <Text
            style={[styles.title, { color: colors.text }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        )}

        <View style={styles.rightSection}>
          <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
            <Icon name="search" size={24} color={colors.text} />
          </TouchableOpacity>

          <CartIcon onPress={handleCartPress} color={colors.text} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 16,
  },
  leftSection: {
    flex: 1,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 2,
    textAlign: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
});

export default CustomHeader;
