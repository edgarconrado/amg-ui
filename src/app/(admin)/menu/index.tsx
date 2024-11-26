import { useProductList } from '@/api/products';
import ProductListitem from '@/components/ProductListItem';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

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