import ProductListitem from '@/components/ProductListItem';
import { View, FlatList } from 'react-native';
import products from '@assets/data/products';


export default function MenuScreen() {
  return (
    <View>
      <FlatList 
        data={products}
        renderItem={({item}) =>  <ProductListitem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10}}
        columnWrapperStyle={{ gap: 10}}
      />
    </View>
  );
}