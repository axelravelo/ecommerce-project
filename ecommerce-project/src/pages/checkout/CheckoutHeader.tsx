import './CheckoutHeader.css';
import CheckoutIcon from '/src/assets/images/icons/checkout-lock-icon.png';
import { Link } from 'react-router';

const CheckoutHeader = () => {
    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <Link to="/">
                        <img className="logo" src="images/logo.png" />
                        <img className="mobile-logo" src="images/mobile-logo.png" />
                    </Link>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<a className="return-to-home-link"
                        href="/">3 items</a>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={CheckoutIcon} />
                </div>
            </div>
        </div>
    );
}

export default CheckoutHeader;