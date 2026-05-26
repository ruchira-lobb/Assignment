import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { store } from './src/redux/store';
import RootStack from './src/navigation/RootStack';
import { useInitializeStore } from './src/hooks/useInitializeStore';

// Component to initialize store with persisted data
const StoreInitializer = ({ children }: { children: React.ReactNode }) => {
  useInitializeStore();
  return <>{children}</>;
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  console.log('')

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StoreInitializer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootStack />
          <FlashMessage position="top"style={{marginTop:70}}/>
        </StoreInitializer>
      </Provider>
    </GestureHandlerRootView>
  );
} 

export default App;
