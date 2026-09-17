import type { DeliveryOption } from '../../types/deliveryOption';
import type { CartItem } from '../../types/cartItem';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import axios from 'axios';

interface DeliveryOptionProps {
    deliveryOption: DeliveryOption;
    cartItem: CartItem;
    fetchCartItems: () => Promise<void>;
}

const DeliveryOptionContainer = ({ deliveryOption, cartItem, fetchCartItems }: DeliveryOptionProps) => {
    let priceString = 'FREE Shipping';

    if (deliveryOption.priceCents > 0) {
        priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
    }

    const updateDeliveryOption = async () => {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id
        });
        await fetchCartItems();
    };

    return (
        <div className="delivery-option"
            onClick={updateDeliveryOption}>
            <input type="radio"
                checked={deliveryOption.id == cartItem.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
                onChange={()=>{}} />
            <div>
                <div className="delivery-option-date">
                    {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                </div>
                <div className="delivery-option-price">
                    {priceString}
                </div>
            </div>
        </div>
    );
}

export default DeliveryOptionContainer;