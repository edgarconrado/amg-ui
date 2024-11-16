import Colors from '@/constants/Colors';
import { Product } from '../types';
import { Image, StyleSheet, Text, View } from 'react-native';

export const defaultProductImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
    product: Product
}

const ProductListitem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image || defaultProductImage }} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListitem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
