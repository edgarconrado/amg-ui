import Button from '@/components/Button';
import CartListItem from '@/components/CartListItem';
import { useCart } from '@/providers/CartProviders';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';

const CartScreen = () => {

  const { items, total, checkout } = useCart();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle= {styles.flatListContainer}
      />

      <Text style={ styles.total}>Total: ${total}</Text>
      <Button onPress={checkout} text='Checkout' />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  flatListContainer: {
    gap: 10,
  },
  total: {
    marginTop: 20, 
    fontSize: 20,
    fontWeight: '500',
  }

});

export default CartScreen;