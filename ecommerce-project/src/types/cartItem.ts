import type { Product } from "./product";

export interface CartItem {
    id: number;
    productId: string;
    quantity: number;
    deliveryOptionId: string;
    createdAt: string;
    updatedAt: string;
    product: Product;
}