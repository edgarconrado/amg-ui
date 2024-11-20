import Button from '@/components/Button';
import { defaultProductImage } from '@/components/ProductListItem';
import { useCart } from '@/providers/CartProviders';
import products from '@assets/data/products';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ProductSize } from '@/types';

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
        style={styles.image} />

      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => { setSelectedSize(size) }}
            style={
              [styles.size,
              { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }
              ]
            }
            key={size}>
            <Text style={[styles.sizeText, { color: selectedSize === size ? 'black' : 'gray' }]}>{size}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price} </Text>
      <Button onPress={addToCar} text='Add to Cart' />
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
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 'auto'
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center'
  },
})

export default ProductDetailsScreen