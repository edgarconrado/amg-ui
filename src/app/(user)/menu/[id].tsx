import { useProduct } from '@/api/products';
import Button from '@/components/Button';
import { defaultProductImage } from '@/components/ProductListItem';
import { useCart } from '@/providers/CartProviders';
import { ProductSize } from '@/types';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {

  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');

  const addToCar = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch the product</Text>
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

      <Text>Description</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {product.description}
        </Text>
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