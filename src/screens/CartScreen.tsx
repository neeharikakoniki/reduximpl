import React, { useCallback } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';
import { selectCartItems, selectTotalPrice } from '../redux/selectors/cartSelectors';
import { RootState } from '../redux/store';

// Memoized component for individual item
const CartItem = React.memo(({ item, onRemove }: any) => {
  console.log('Rendering item:', item.title);
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Button title="Remove" onPress={() => onRemove(item.id)} />
    </View>
  );
});

const CartScreen = () => {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItems, shallowEqual);  // shallow compare array
  const totalPrice = useSelector(selectTotalPrice);          // memoized selector

  const handleAdd = useCallback(() => {
    const id = Math.floor(Math.random() * 10000);
    const newItem = { id, title: `Item ${id}`, price: Number((Math.random() * 50).toFixed(2)) };
    dispatch(addToCart(newItem));
  }, [dispatch]);

  const handleRemove = useCallback((id: number) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart Optimization Demo</Text>
      <Button title="Add Random Item" onPress={handleAdd} />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CartItem item={item} onRemove={handleRemove} />}
      />
      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { backgroundColor: '#f3f3f3', marginVertical: 6, padding: 10, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: '600' },
  price: { color: 'green' },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 10 },
});
