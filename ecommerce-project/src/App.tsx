import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';

import type { CartItem } from './types/cartItem';

import HomePage from './pages/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/orders/OrdersPage';
import TrackingPage from './pages/tracking/TrackingPage';
import NotFoundPage from './pages/NotFoundPage';

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    const response = await axios.get<CartItem[]>('/api/cart-items?expand=product')
    setCartItems(response.data);
  }

  useEffect(() => {
    // Query parameter -> Lets us add additional info to our request
    // When the backend receives the query param, it's gonna add product details to the cart

    fetchCartItems();
  }, []);

  return { cartItems, fetchCartItems };
}

function App() {
  const { cartItems, fetchCartItems } = useCart();

  
  return (
    <>
      <Routes>
        <Route index element={<HomePage cartItems={cartItems} fetchCartItems={fetchCartItems} />} />
        <Route path="checkout" element={<CheckoutPage cartItems={cartItems} fetchCartItems={fetchCartItems}/>} />
        <Route path="orders" element={<OrdersPage cart={cartItems} fetchCartItems={fetchCartItems}/>} />
        <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cartItems} />} />
        <Route path="*" element={<NotFoundPage cart={cartItems} />} />
      </Routes>

    </>
  )
}

export default App
