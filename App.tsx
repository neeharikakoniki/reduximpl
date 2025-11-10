
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import CounterScreen from './src/screens/CounterScreen';
import ProductListScreen from './src/screens/ProductListScreen';
import ProductSagaScreen from './src/screens/ProductSagaScreen';
import ProductRTKQueryScreen from './src/screens/ProductRTKQueryScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import CartScreen from './src/screens/CartScreen';
const App = () => {
  return (
    <Provider store={store}>

      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="#fff"
            translucent={false}
          />

          {/* ----- Phase 1 (Redux Basics) ----- */}
          {/* <CounterScreen /> */}

          {/* ----- Phase 2 (Redux Thunk) ----- */}
          {/* <ProductListScreen /> */}

          {/* ----- Phase 3 (Redux Saga) ----- */}
          <ProductSagaScreen />

          {/* ----- Phase 4 (RTK Query) ----- */}
          {/* <ProductRTKQueryScreen /> */}

          {/* ----- Phase 5 (Optimization) ----- */}
          {/* <CartScreen /> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});