import { useAdminOrderList, useMyOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import orders from '@assets/data/orders';
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrdersScreen() {

    const { data: orders, isLoading, error } = useMyOrderList();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text> Failed to Ferch</Text>
    }

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10}}
        />
    );
}