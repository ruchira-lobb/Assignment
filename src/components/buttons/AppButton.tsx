import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useAppTheme } from '../../theme/theme';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  style,
  textStyle,
  loading = false,
}) => {
  const colors = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor || colors.primary,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, { color: textColor || '#fff' }, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});
