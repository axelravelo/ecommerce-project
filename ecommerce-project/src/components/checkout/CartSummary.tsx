import { formatMoney } from '../../utils/money'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import type { PaymentSummary } from '../../types/paymentSummary';
import type { CartItem } from '../../types/cartItem';

interface CartSummaryProps {
    cartItems: CartItem[]
    fetchCartItems: () => Promise<void>;
}

const usePaymentSummary = (cartItems: CartItem[]) => {
    const [paymentSummary, setPaymentSummary] = useState<PaymentSummary | null>(null);

    useEffect(() => {
        const fetchPaymentSummary = async () => {
            const response = await axios.get<PaymentSummary>('/api/payment-summary')
            setPaymentSummary(response.data);
        }
        fetchPaymentSummary();
    }, [cartItems]);

    return paymentSummary;
}

const CartSummary = ({ cartItems, fetchCartItems }: CartSummaryProps) => {
    const paymentSummary = usePaymentSummary(cartItems);
    // lets us go to another page
    const navigate = useNavigate();

    if (!paymentSummary) {
        return null;
    }

    const createOrder = async () => {
        await axios.post('/api/orders');
        await fetchCartItems();
        navigate('/orders');
    }

    return (
        <div className="payment-summary">
            <div className="payment-summary-title">
                Payment Summary
            </div>

            <div className="payment-summary-row"
                data-testid="product-cost-cents"
            >
                <div>Items ({paymentSummary.totalItems}):</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div>
            </div>

            <div className="payment-summary-row"
                data-testid="shipping-cost-cents"
            >
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
            </div>

            <div className="payment-summary-row subtotal-row"
                data-testid="total-cost-before-tax-cents"
            >
                <div>Total before tax:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
            </div>

            <div className="payment-summary-row"
                data-testid="tax-cents"
            >
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
            </div>

            <div className="payment-summary-row total-row"
                data-testid="total-cost-cents"
            >
                <div>Order total:</div>
                <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
            </div>

            <button className="place-order-button button-primary"
                data-testid="place-order-button"
                onClick={createOrder}>
                Place your order
            </button>
        </div>
    );
}

export default CartSummary;