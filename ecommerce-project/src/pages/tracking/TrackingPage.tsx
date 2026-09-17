import './TrackingPage.css'
import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router';
import Header from '../../components/Header';

import type { CartItem } from '../../types/cartItem';
import type { Order } from '../../types/order';

interface TrackingPageProps {
    cart: CartItem[];
}

const useOrder = (orderId: string) => {
    const [order, setOrder] = useState<Order>();

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get<Order>(`/api/orders/${orderId}?expand=products`)
            setOrder(response.data);
        }
        fetchOrders();
    }, [orderId]);

    return order;
}

const calculateDeliveryProgress = (estimatedDeliveryTimeMs: number, orderTimeMs: number) => {
    const totalDeliveryTimeMs = estimatedDeliveryTimeMs - orderTimeMs;
    console.log(estimatedDeliveryTimeMs)
    console.log(orderTimeMs)
    // const timePassedMs = dayjs().valueOf() - orderTimeMs; //use this when dates align 
    const timePassedMs = 129600000;

    const timePercent = Math.max(0, Math.min((timePassedMs / totalDeliveryTimeMs) * 100, 100));
    console.log(timePercent)

    return timePercent;
}

const TrackingPage = ({ cart }: TrackingPageProps) => {
    const { orderId, productId } = useParams();

    if (!orderId) {
        return null;
    }

    const order = useOrder(orderId);

    if (!order) {
        return null;
    }

    const orderProduct = order.products.find((product) => product.productId === productId);

    if (!orderProduct) {
        return null;
    }

    const deliveryPercent = calculateDeliveryProgress(orderProduct.estimatedDeliveryTimeMs, order.orderTimeMs);

    const isPreparing = deliveryPercent < 33;
    const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
    const isDelivered = deliveryPercent === 100;

    return (
        <>
            <Header cart={cart} />
            <div className="tracking-page">
                <div className="order-tracking">
                    <NavLink className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </NavLink>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct?.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className={`progress-label ${isPreparing && 'current-status'}`}>
                            Preparing
                        </div>

                        <div className={`progress-label ${isShipped && 'current-status'}`}>
                            Shipped
                        </div>

                        <div className={`progress-label ${isDelivered && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default TrackingPage;