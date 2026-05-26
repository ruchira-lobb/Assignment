import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSearchQuery, resetFilters } from '../../redux/slices/foodSlice';
import { useAppTheme } from '../../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = () => {
  const colors = useAppTheme();
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state: RootState) => state.food);
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const animatedWidth = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const handleSearch = (text: string) => {
    setLocalQuery(text);
    dispatch(setSearchQuery(text));
  };

  const handleClear = () => {
    setLocalQuery('');
    dispatch(setSearchQuery(''));
  };

  const borderColor = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.text + '20', colors.primary],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor,
          borderWidth: 1,
        },
      ]}
    >
      <Icon name="search" size={20} color={colors.text + '80'} />

      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder="Search dishes, cuisines..."
        placeholderTextColor={colors.text + '60'}
        value={localQuery}
        onChangeText={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {localQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Icon name="close" size={18} color={colors.text + '80'} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    height: 46,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
});

export default SearchBar;
