import { useAdminOrderList } from "@/api/orders";
import OrderListItem from "@/components/OrderListItem";
import { FlatList } from "react-native";

export default function OrdersScreen() {

    const {
        data: orders, 
        isLoading, 
        error
    } = useAdminOrderList({archived: true})

    return (
        <FlatList
            data={orders}
            renderItem={({ item }) => <OrderListItem order={item} />}
            contentContainerStyle={{ gap: 10, padding: 10}}
        />
    );
}