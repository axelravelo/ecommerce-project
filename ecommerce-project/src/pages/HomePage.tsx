import './HomePage.css';
import axios from 'axios';
import Header from '../components/Header';
import ProductContainer from '../components/ProductContainer';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

import type { Product } from '../types/product';
import type { CartItem } from '../types/cartItem';

interface HomePageProps {
    cartItems: CartItem[];
    fetchCartItems: () => Promise<void>;
}

const useProducts = (search: string | null) => {
    const [products, setProducts] = useState<Product[]>([]);
    //npm library to make accessing the backend more readable
    useEffect(() => {
        const url = search
            ? `http://localhost:3000/api/products?search=${search}`
            : 'http://localhost:3000/api/products';

        axios.get<Product[]>(url).then(response => {
            setProducts(response.data);
        });
    }, [search]);
    return products
}


const HomePage = ({ cartItems, fetchCartItems }: HomePageProps) => {
    // //Async code, fetch gets the response from the api
    // fetch('http://localhost:3000/api/products')
    //     //after getting the response get the data from the response which is also async
    //     .then((response) => {
    //         return response.json()
    //     }).then((data) => {
    //         console.log(data)
    //     })
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const products = useProducts(search);


    return (
        <>
            <link rel="icon" type="image/png" href="/home-favicon.png" />
            <title>Home</title>
            <Header cart={cartItems} />
            <div className="home-page">
                <div className="products-grid">
                    {products.map((product) => (
                        <ProductContainer
                            key={product.id} //react uses this (useful for reconciling changes made to the list)
                            product={product} //this is for my component
                            fetchCartItems={fetchCartItems}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomePage