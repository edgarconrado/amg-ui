import Colors from '@/constants/Colors';
import { Image, StyleSheet, Text, View } from 'react-native';

const ProductListitem = ({ product }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.image}} />
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
