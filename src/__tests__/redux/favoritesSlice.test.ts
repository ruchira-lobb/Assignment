import favoritesReducer, {
  addFavorite,
  removeFavorite,
  clearFavorites,
} from '../../redux/slices/favoritesSlice';

describe('favorites reducer', () => {
  // Test 1: Add item to favorites
  it('should add item to favorites', () => {
    const initialState = { items: [] };
    const newState = favoritesReducer(initialState, addFavorite('1'));

    expect(newState.items).toContain('1');
    expect(newState.items.length).toBe(1);
  });

  // Test 2: Add duplicate item (should not add again)
  it('should not add duplicate item to favorites', () => {
    const initialState = { items: ['1'] };
    const newState = favoritesReducer(initialState, addFavorite('1'));

    expect(newState.items).toEqual(['1']);
    expect(newState.items.length).toBe(1);
  });

  // Test 3: Remove item from favorites
  it('should remove item from favorites', () => {
    const initialState = { items: ['1', '2', '3'] };
    const newState = favoritesReducer(initialState, removeFavorite('2'));

    expect(newState.items).not.toContain('2');
    expect(newState.items).toEqual(['1', '3']);
    expect(newState.items.length).toBe(2);
  });

  // Test 4: Clear all favorites
  it('should clear all favorites', () => {
    const initialState = { items: ['1', '2', '3'] };
    const newState = favoritesReducer(initialState, clearFavorites());

    expect(newState.items).toEqual([]);
    expect(newState.items.length).toBe(0);
  });

  // Test 5: Remove non-existent item (should do nothing)
  it('should do nothing when removing non-existent item', () => {
    const initialState = { items: ['1', '2', '3'] };
    const newState = favoritesReducer(initialState, removeFavorite('99'));

    expect(newState.items).toEqual(['1', '2', '3']);
    expect(newState.items.length).toBe(3);
  });
});
