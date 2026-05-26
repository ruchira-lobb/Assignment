import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { useAppTheme } from '../../theme/theme';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 160;

interface SkeletonProps {
  count?: number;
}

const FoodCardSkeleton: React.FC<SkeletonProps> = ({ count = 3 }) => {
  const colors = useAppTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Classic shimmer animation - continuous loop with easing
    const animation = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );
    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  // Create translateX interpolation for shimmer effect
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  const renderSkeletonItem = (index: number) => (
    <View
      key={index}
      style={[
        styles.skeletonCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.text + '10',
        },
      ]}
    >
      {/* Image Skeleton with Shimmer */}
      <View style={[styles.skeletonImage, { backgroundColor: colors.skeleton }]}>
        <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
          <LinearGradient
            colors={['transparent', colors.shimmer, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </Animated.View>
      </View>

      {/* Content Skeleton */}
      <View style={styles.skeletonContent}>
        {/* Title Skeleton with Shimmer */}
        <View style={[styles.skeletonTitle, { backgroundColor: colors.skeleton }]}>
          <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
            <LinearGradient
              colors={['transparent', colors.shimmer, 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            />
          </Animated.View>
        </View>

        {/* Price and Veg/Non-veg row */}
        <View style={styles.skeletonRow}>
          <View style={[styles.skeletonPrice, { backgroundColor: colors.skeleton }]}>
            <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
              <LinearGradient
                colors={['transparent', colors.shimmer, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </Animated.View>
          </View>
          <View style={[styles.skeletonTag, { backgroundColor: colors.skeleton }]}>
            <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
              <LinearGradient
                colors={['transparent', colors.shimmer, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </Animated.View>
          </View>
        </View>

        {/* Buttons row */}
        <View style={styles.skeletonButtonRow}>
          <View style={[styles.skeletonButton, { backgroundColor: colors.skeleton }]}>
            <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
              <LinearGradient
                colors={['transparent', colors.shimmer, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </Animated.View>
          </View>
          <View style={[styles.skeletonButton, { backgroundColor: colors.skeleton }]}>
            <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
              <LinearGradient
                colors={['transparent', colors.shimmer, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
              />
            </Animated.View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {Array(count)
        .fill(0)
        .map((_, index) => renderSkeletonItem(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100, // Account for header
  },
  skeletonCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  skeletonImage: {
    width: '100%',
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonContent: {
    padding: 12,
  },
  skeletonTitle: {
    height: 20,
    width: '60%',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  skeletonPrice: {
    height: 16,
    width: 60,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonTag: {
    height: 16,
    width: 70,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  skeletonButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skeletonButton: {
    flex: 0.48,
    height: 40,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
  },
});

export default FoodCardSkeleton;