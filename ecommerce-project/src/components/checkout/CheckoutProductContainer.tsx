import dayjs from 'dayjs';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

import type { CartItem } from '../../types/cartItem';
import type { DeliveryOption } from '../../types/deliveryOption';
import DeliveryOptionContainer from './DeliveryOptionContainer';
import { formatMoney } from '../../utils/money'

interface CheckoutProductProps {
    cartItem: CartItem;
    deliveryOptions: DeliveryOption[];
    fetchCartItems: () => Promise<void>;
}

const deleteCartItem = async (cartItem: CartItem, fetchCartItems: () => Promise<void>) => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await fetchCartItems()
}

const updateCartItemAmount = async (cartItem: CartItem, quantity: number, fetchCartItems: () => Promise<void>) => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: quantity
    });
    await fetchCartItems();
};

const CheckoutProductContainer = ({ cartItem, deliveryOptions, fetchCartItems }: CheckoutProductProps) => {
    const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
        return deliveryOption.id === cartItem.deliveryOptionId;
    });

    if (!selectedDeliveryOption) {
        return null;
    }

    const [showUpdate, setShowUpdate] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (showUpdate) {
            inputRef.current?.focus();
        }
    }, [showUpdate]);

    return (
        <div className="cart-item-container">
            <div className="delivery-date">
                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div className="cart-item-details-grid">
                <img className="product-image"
                    src={cartItem.product.image} />

                <div className="cart-item-details">
                    <div className="product-name">
                        {cartItem.product.name}
                    </div>
                    <div className="product-price">
                        {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                        <span>
                            Quantity:
                            {showUpdate ? (
                                <input
                                    ref={inputRef}
                                    type="number"
                                    min="1" max="10"
                                    className="update-text-input"
                                    value={quantity}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                        setQuantity(Number(event.target.value));
                                    }}
                                    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                                        if (event.key === 'Enter') {
                                            updateCartItemAmount(cartItem, quantity, fetchCartItems);
                                        }
                                        if (event.key === 'Escape') {
                                            setQuantity(cartItem.quantity);
                                        }
                                        setShowUpdate(false);
                                    }}
                                />

                            ) : (
                                <span className="quantity-label">{cartItem.quantity}</span>
                            )}
                        </span>
                        <span className="update-quantity-link link-primary"
                            onClick={() => {
                                if (!showUpdate) {
                                    setShowUpdate(true);
                                    inputRef.current?.focus();

                                }
                                else {
                                    setShowUpdate(false);
                                    updateCartItemAmount(cartItem, quantity, fetchCartItems);
                                }
                            }}>
                            Update
                        </span>
                        <span className="delete-quantity-link link-primary"
                            onClick={() => deleteCartItem(cartItem, fetchCartItems)}>
                            Delete
                        </span>
                    </div>
                </div>

                <div className="delivery-options">
                    <div className="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    {deliveryOptions.map((deliveryOption) => (
                        <DeliveryOptionContainer
                            key={deliveryOption.id} //react uses this (useful for reconciling changes made to the list)
                            deliveryOption={deliveryOption} //this is for my component
                            cartItem={cartItem} //this is for my component
                            fetchCartItems={fetchCartItems}
                        />
                    ))}

                </div>
            </div>
        </div>
    );
}

export default CheckoutProductContainer;