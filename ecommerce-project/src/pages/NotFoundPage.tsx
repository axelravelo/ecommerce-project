import Header from '../components/Header';
import type { CartItem } from '../types/cartItem';

interface NotFoundPageProps {
    cart: CartItem[];
}

const NotFoundPage = ({ cart }: NotFoundPageProps) => {
    return (
        <>
            <Header cart={cart} />
            <div className='mt-[75px] ml-[25px]'>404 NOT FOUND</div>
        </>
    );
}

export default NotFoundPage;