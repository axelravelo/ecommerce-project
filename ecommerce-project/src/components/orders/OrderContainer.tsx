import dayjs from 'dayjs';

import type { Order } from '../../types/order';
import { formatMoney } from '../../utils/money';

import OrderProductContainer from './OrderProductContainer';

interface OrderProps {
    order: Order;
    fetchCartItems: () => Promise<void>;
}

const OrderContainer = ({ order, fetchCartItems }: OrderProps) => {
    return (
        <div className="order-container">
            <div className="order-header">
                <div className="order-header-left-section">
                    <div className="order-date">
                        <div className="order-header-label">Order Placed:</div>
                        <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                        <div className="order-header-label">Total:</div>
                        <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                </div>

                <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                </div>
            </div>

            <div className="order-details-grid">
                {order.products.map((orderProduct) => (
                    <OrderProductContainer
                        key={orderProduct.productId} //react uses this (useful for reconciling changes made to the list)
                        orderProduct={orderProduct} //this is for my component
                        order={order} //this is for my component
                        fetchCartItems={fetchCartItems}
                    />
                ))}
            </div>
        </div>
    );
}

export default OrderContainer;