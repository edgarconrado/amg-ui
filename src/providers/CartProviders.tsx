import { CartItem, Product } from "@/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
});

const CartProviders = ({ children }: PropsWithChildren) => {

    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {

        const existingItems = items.find(
            (item) => item.product === product && item.size === size
        );

        if( existingItems) {
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

    return (
        <CartContext.Provider value={{ items: items, addItem, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProviders;

export const useCart = () => useContext(CartContext);