import ProductListitem from '@/components/ProductListItem';
import { View } from 'react-native';
import products from '../../../assets/data/products';


export default function MenuScreen() {
  return (
    <View>
      <ProductListitem product={products[0]} />      
    </View>
  );
}