
import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchProductsRequest,
} from '../redux/sagas/productSaga';
import { RootState, AppDispatch } from '../redux/store';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductSagaScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector((state: RootState) => state.productsSaga);

    useEffect(() => {
        dispatch(fetchProductsRequest());
    }, [dispatch]);

    if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
    if (error) return <Text style={styles.error}>{error}</Text>;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Products (Redux Saga)</Text>
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


        </SafeAreaView>

    );
};

export default ProductSagaScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    error: { color: 'red', textAlign: 'center', marginTop: 50 },
    title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 10 },
    card: {
        backgroundColor: '#eaeaea',
        marginVertical: 6,
        padding: 10,
        borderRadius: 8,
    },
    name: { fontSize: 16, fontWeight: '600' },
    price: { color: 'green' },
});
