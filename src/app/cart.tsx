import CartListItem from '@/components/CartListItem';
import { useCart } from '@/providers/CartProviders';
import { StatusBar } from 'expo-status-bar'
import { FlatList, Platform, Text, View } from 'react-native'

const CartScreen = () => {

  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
};

export default CartScreen;