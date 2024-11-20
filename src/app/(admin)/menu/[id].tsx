import Button from '@/components/Button';
import { defaultProductImage } from '@/components/ProductListItem';
import { useCart } from '@/providers/CartProviders';
import { ProductSize } from '@/types';
import products from '@assets/data/products';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {

  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');

  const product = products.find((p) => p.id.toString() === id);

  const addToCar = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');

  }

  if (!product) {
    return <Text>Product Not Found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: 'Details ' + product?.name }}
      />
      <Image
        source={{ uri: product.image || defaultProductImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name} </Text>

      <Text>Description</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {product.description}
        </Text>
      </View>

      <Text style={styles.price}>${product.price} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10

  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    justifyContent: 'space-around',
    marginVertical: 10
  },
  description: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left'

  }
})

export default ProductDetailsScreen