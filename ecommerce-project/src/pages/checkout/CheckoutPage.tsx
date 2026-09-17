import { useEffect, useState } from 'react';
import axios from 'axios'

import './CheckoutPage.css';
import CheckoutHeader from './CheckoutHeader.tsx';
import CheckoutProductContainer from '../../components/checkout/CheckoutProductContainer.tsx'
import CartSummary from '../../components/checkout/CartSummary';

import type { CartItem } from '../../types/cartItem';
import type { DeliveryOption } from '../../types/deliveryOption';

interface CheckoutPageProps {
    cartItems: CartItem[];
    fetchCartItems: () => Promise<void>;
}

const useDeliveryOptions = () => {
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);

    useEffect(() => {
        // Query parameter -> Lets us add additional info to our request
        // When the backend receives the query param, it's gonna add product details to the cart
        const fetchDeliveryOptions = async () => {
            const response = await axios.get<DeliveryOption[]>('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data);
        }
        fetchDeliveryOptions();
    }, []);

    return deliveryOptions;
}

//Shift + alt + f to format document
const CheckoutPage = ({ cartItems, fetchCartItems }: CheckoutPageProps) => {
    const deliveryOptions = useDeliveryOptions();

    return (
        <>
            <link rel="icon" type="image/png" href="/cart-favicon.png" />
            <title>Checkout</title>
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cartItems.map((cartItem) => (
                            <CheckoutProductContainer
                                key={cartItem.id} //react uses this (useful for reconciling changes made to the list)
                                cartItem={cartItem} //this is for my component
                                deliveryOptions={deliveryOptions} //this is for my component
                                fetchCartItems={fetchCartItems}
                            />
                        ))}
                    </div>

                    <CartSummary
                        cartItems={cartItems}
                        fetchCartItems={fetchCartItems}
                    />
                </div>
            </div>
        </>
    );
}

export default CheckoutPage