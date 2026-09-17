import dayjs from 'dayjs';
import axios from 'axios';
import { Link } from 'react-router';

import type { OrderProduct, Order } from '../../types/order';

import BuyAgainIcon from '/src/assets/images/icons/buy-again.png';

interface OrderProductProps {
    orderProduct: OrderProduct;
    order: Order;
    fetchCartItems: () => Promise<void>;
}

const OrderContainer = ({ orderProduct, order, fetchCartItems }: OrderProductProps) => {

    const addToCart = async () => {
        //create data in the backend
        //when we use post we can send data to the backend using an object, this is called the request body
        await axios.post('/api/cart-items', {
            productId: orderProduct.productId,
            quantity: 1
        });

        await fetchCartItems();
    }

    return (
        <>
            <div className="product-image-container">
                <img src={orderProduct.product.image} />
            </div>

            <div className="product-details">
                <div className="product-name">
                    {orderProduct.product.name}
                </div>
                <div className="product-delivery-date">
                    Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                </div>
                <div className="product-quantity">
                    Quantity: {orderProduct.quantity}
                </div>
                <button className="buy-again-button button-primary">
                    <img className="buy-again-icon" src={BuyAgainIcon} />
                    <span className="buy-again-message"
                        onClick={addToCart}>
                        Add to Cart
                    </span>
                </button>
            </div>

            <div className="product-actions">
                <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                    <button className="track-package-button button-secondary">
                        Track package
                    </button>
                </Link>
            </div>
        </>
    );
}

export default OrderContainer;