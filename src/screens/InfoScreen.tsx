import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { useAppTheme } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';
import AppButton from '../components/buttons/AppButton';
import { styles } from '../styles/screens/InfoScreen.styles';

type InfoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Info'
>;

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const InfoScreen = () => {
  const colors = useAppTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<InfoScreenNavigationProp>();

  const handleViewSource = () => {
    Linking.openURL('https://github.com/ruchirabh');
  };

  const FeatureItem: React.FC<FeatureItemProps> = ({
    icon,
    title,
    description,
  }) => (
    <View style={[styles.featureItem, { backgroundColor: colors.card }]}>
      <View
        style={[
          styles.featureIconContainer,
          { backgroundColor: colors.primary + '20' },
        ]}
      >
        <Icon name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.featureTextContainer}>
        <Text style={[styles.featureTitle, { color: colors.text }]}>
          {title}
        </Text>
        <Text
          style={[styles.featureDescription, { color: colors.text + 'CC' }]}
        >
          {description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          About Lobb
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* App Logo/Title Section */}
        <LinearGradient
          colors={[colors.primary + '20', colors.background]}
          style={styles.heroSection}
        >
          <View
            style={[styles.logoContainer, { backgroundColor: colors.primary }]}
          >
            <Text style={styles.logoText}>L</Text>
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>Lobb</Text>
          <Text style={[styles.version, { color: colors.text + '99' }]}>
            Version 1.0.0
          </Text>
          <View style={styles.badgeContainer}>
            <View
              style={[styles.badge, { backgroundColor: colors.primary + '20' }]}
            >
              <Text style={[styles.badgeText, { color: colors.primary }]}>
                React Native Demo App
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About the App
          </Text>
          <Text style={[styles.aboutText, { color: colors.text + 'CC' }]}>
            Lobb is a modern food ordering application built with React Native.
            It demonstrates best practices in mobile development with a clean,
            scalable architecture and beautiful UI.
          </Text>
        </View>

        {/* Key Features Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Key Features
          </Text>

          <FeatureItem
            icon="shopping-cart"
            title="Shopping Cart"
            description="Add, remove, and manage items with real-time updates"
          />

          <FeatureItem
            icon="infinite"
            title="Infinite Scroll"
            description="Paginated product loading for smooth performance"
          />

          <FeatureItem
            icon="dark-mode"
            title="Dark Mode"
            description="Automatic theme switching with system preferences"
          />

          <FeatureItem
            icon="skeleton"
            title="Skeleton Loaders"
            description="Smooth loading states for better UX"
          />

          <FeatureItem
            icon="favorite"
            title="Favorites"
            description="Save and manage your favorite items"
          />

          <FeatureItem
            icon="search"
            title="Advanced Search"
            description="Search with filters and categories"
          />
        </View>

        {/* Tech Stack Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Tech Stack
          </Text>

          <View style={styles.techGrid}>
            {[
              { name: 'React Native', icon: 'code' },
              { name: 'TypeScript', icon: 'data-usage' },
              { name: 'Redux Toolkit', icon: 'storage' },
              { name: 'RTK Query', icon: 'api' },
              { name: 'React Navigation', icon: 'navigation' },
              { name: 'AsyncStorage', icon: 'save' },
              { name: 'Axios', icon: 'http' },
              { name: 'Reanimated', icon: 'animation' },
            ].map((tech, index) => (
              <View
                key={index}
                style={[styles.techItem, { backgroundColor: colors.card }]}
              >
                <Icon name={tech.icon} size={16} color={colors.primary} />
                <Text style={[styles.techName, { color: colors.text }]}>
                  {tech.name}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.apiInfoCard}>
            <Icon name="cloud" size={20} color={colors.primary} />
            <Text style={[styles.apiInfoText, { color: colors.text }]}>
              API Integration:
            </Text>
            <Text style={[styles.apiUrl, { color: colors.primary }]}>
              api.jsonbin.io/v3
            </Text>
          </View>
        </View>

        {/* Source Code Button */}
        <View style={styles.sourceSection}>
          <AppButton
            title="View Source Code"
            onPress={handleViewSource}
            backgroundColor={colors.primary}
            style={styles.sourceButton}
          />
          <Text style={[styles.copyright, { color: colors.text + '80' }]}>
            © 2026 Lobb. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default InfoScreen;
