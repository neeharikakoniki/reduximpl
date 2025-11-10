
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useGetProductsQuery } from '../redux/api/productApi';
const ProductRTKQueryScreen = () => {
  const { data: products, error, isLoading, refetch } = useGetProductsQuery();

  if (isLoading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load products</Text>
        <Text style={styles.link} onPress={refetch}>
          Tap to Retry
        </Text>
      </View>
    );

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Products (RTK Query)</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProductRTKQueryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 10 },
  error: { color: 'red', textAlign: 'center', marginBottom: 8 },
  link: { color: 'blue', textDecorationLine: 'underline' },
  card: {
    backgroundColor: '#f3f3f3',
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
  },
  name: { fontSize: 16, fontWeight: '600' },
  price: { color: 'green' },
});
