import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: string;
    image?: string;
    purchaseType?: 'whatsapp' | 'chariow';
    purchaseLink?: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addToCart = (product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    // Helper to parse price string like "$45.00" to number
    const parsePrice = (priceStr: string) => {
        return parseFloat(priceStr.replace(/[^0-9]/g, '')) || 0;
    };

    const cartTotal = items.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            cartCount,
            cartTotal,
            isCartOpen,
            openCart,
            closeCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        // Fallback to prevent crash when used outside CartProvider (e.g. Admin Dashboard)
        return {
            items: [],
            addToCart: () => console.warn('CartContext: addToCart called outside Provider'),
            updateQuantity: () => { },
            removeFromCart: () => { },
            clearCart: () => { },
            cartCount: 0,
            cartTotal: 0,
            isCartOpen: false,
            openCart: () => console.warn('CartContext: openCart called outside Provider'),
            closeCart: () => { }
        };
    }
    return context;
};
