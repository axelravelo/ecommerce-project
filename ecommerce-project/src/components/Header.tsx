import './Header.css'
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useState } from 'react';
import CartIcon from '/src/assets/images/icons/cart-icon.png';
import SearchIcon from '/src/assets/images/icons/search-icon.png';
import { NavLink, useNavigate, useSearchParams } from 'react-router'
import type { CartItem } from '../types/cartItem';

interface ProductProps {
    cart: CartItem[];
}

const Header = ({ cart }: ProductProps) => {
    const [searchParams] = useSearchParams();
    const searchFromUrl = searchParams.get("search");

    const [search, setSearch] = useState(searchFromUrl ?? "");
    const navigate = useNavigate();

    //The link component lets us go to another page without reloading the whole site
    const totalProducts = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src="images/logo-white.png" />
                    <img className="mobile-logo"
                        src="images/mobile-logo-white.png" />
                </NavLink>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setSearch(event.target.value);
                        // console.log(searchText);
                    }}
                    onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                        if (event.key === 'Enter') {
                            navigate(`/?search=${search}`);
                        }
                        if (event.key === 'Escape') {
                            setSearch("");
                        }
                    }}
                    value={search}
                />

                <button
                    className="search-button"
                    onClick={() => {
                        navigate(`/?search=${search}`);
                    }}
                >
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink
                    className={({ isActive }) =>
                        `orders-link header-link ${isActive ? 'active' : ''}`
                    }
                    to="/orders"
                >

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{totalProducts}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}

export default Header;