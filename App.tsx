import { StatusBar, StyleSheet, Text, useColorScheme, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './src/redux/store/mystore';
import { decrement, increment, incrementByAmount, reset } from './src/redux/slices/counterSlice';
import { useState } from 'react';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </Provider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const [ amount, setAmount] = useState(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.container1}>Count: {count}</Text>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(increment())}>
        <Text style={styles.buttonText}> + </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(decrement())}>
        <Text style={styles.buttonText}> - </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => dispatch(reset())}>
        <Text style={styles.buttonText}> Reset </Text>
      </TouchableOpacity>

     <TextInput
     placeholder='enter a number'
     keyboardType='numeric'
     value={amount}
     onChangeText={setAmount}
     />

      <TouchableOpacity style={styles.button} onPress={() =>dispatch(incrementByAmount(Number(amount)))}>
        <Text style={styles.buttonText}> Inc by amt</Text>

      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container1: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
