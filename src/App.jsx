// src/App.jsx
import {Suspense, useState, useEffect} from "react";
import {ProductList} from "./ProductList.jsx";
import {Cart} from "./Cart.jsx";
import {Navbar} from "./Navbar.jsx";


export default function App() {
    const [cart, setCart] = useState([]);

    const [isCartOpen, setIsCartOpen] = useState(false);


    function handleOpenCart() {
        setIsCartOpen(true);
    }

    function handleCloseCart() {
        setIsCartOpen(false);
    }


    function onAddToCart(product) {
        setCart([...cart, product]);
    }

    function handleRemoveFromCart(productId) {
        setCart(cart.filter(p => p.id !== productId));
    }

    useEffect(() => {
        if (cart.length === 0) {
            document.title = "My Store";
        } else {
            document.title = `My Store | Cart (${cart.length})`;
        }
    }, [cart])


    return (
        <div>
            <Navbar cartCount={cart.length} onOpenCart={handleOpenCart}/>
            {isCartOpen && <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} onClose={handleCloseCart}/>}

            {/* Suspense "čuva stražu" dok podaci putuju */}
            <Suspense fallback={<h2>Loading products... ⏳</h2>}>
                <ProductList onAddToCart={onAddToCart}/>
            </Suspense>
        </div>
    )
}