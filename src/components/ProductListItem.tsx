import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Tables } from '../types';
import RemoteImage from './RemoteImage';

export const defaultProductImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

type ProductListItemProps = {
  product: Tables<'products'>;
}

const ProductListitem = ({ product }: ProductListItemProps) => {

  const segment = useSegments();

  return (
    <Link href={`/${segment[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultProductImage}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListitem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%'
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
