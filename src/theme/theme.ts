import { useColorScheme } from 'react-native';
import { LightColors, DarkColors } from './colors';

export const useAppTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? DarkColors : LightColors;
};
