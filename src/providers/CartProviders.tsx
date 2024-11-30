
import { useInsertOrder } from "@/api/orders";
import { CartItem, Tables } from "@/types";
import { randomUUID } from "expo-crypto";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type Product = Tables<'products'>;

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
    checkout: () => void;
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    checkout: () => {},
});

const CartProviders = ({ children }: PropsWithChildren) => {

    const [items, setItems] = useState<CartItem[]>([]);
    const { mutate: insertOrder } = useInsertOrder();
    const router = useRouter();

    const addItem = (product: Product, size: CartItem['size']) => {

        const existingItems = items.find(
            (item) => item.product === product && item.size === size
        );

        if (existingItems) {
            updateQuantity(existingItems.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }
        setItems([newCartItem, ...items])
    };

    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        setItems(
            items.map(item =>
                item.id !== itemId
                    ? item
                    : { ...item, quantity: item.quantity + amount }
            ).filter((item) => item.quantity > 0)
        );
    };
    
    const total = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity), 
        0
    );

    const clearCart = () => {
        setItems([]);
    }

    const checkout = () => {
       insertOrder({
        total
       }, {onSuccess: (data) => {
        clearCart();
        router.push(`/(user)/orders/${data.id}`);
       } })
    }

    return (
        <CartContext.Provider value={{ items: items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProviders;

export const useCart = () => useContext(CartContext);