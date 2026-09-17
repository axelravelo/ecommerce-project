import './OrdersPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
// window.axios = axios;
import Header from '../../components/Header';
import OrderContainer from '../../components/orders/OrderContainer';

import type { CartItem } from '../../types/cartItem';
import type { Order } from '../../types/order';

interface OrdersPageProps {
    cart: CartItem[];
    fetchCartItems: () => Promise<void>;
}


const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchOrders = async () => {
        const response = await axios.get<Order[]>('/api/orders?expand=products')
        setOrders(response.data);
    }

    useEffect(() => {

        fetchOrders();
    }, []);

    // useEffect(() => {
    //     axios.get('/api/orders?expand=products')
    //         .then((response) => {
    //             setOrders(response.data);
    //         },);

    // }, []);

    return orders;
}


const OrdersPage = ({ cart, fetchCartItems }: OrdersPageProps) => {
    const orders = useOrders();
    return (
        <>
            <link rel="icon" type="image/png" href="/orders-favicon.png" />
            <Header cart={cart} />
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => (
                        <OrderContainer
                            key={order.id} //react uses this (useful for reconciling changes made to the list)
                            order={order} //this is for my component
                            fetchCartItems={fetchCartItems}
                        />
                    ))}
                </div>
            </div>

        </>
    );
}


export default OrdersPage