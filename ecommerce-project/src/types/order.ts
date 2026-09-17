import type { Product } from './product';

export interface OrderProduct {
    productId: string;
    quantity: number;
    estimatedDeliveryTimeMs: number;
    product: Product;
}

export interface Order {
    id: string;
    orderTimeMs: number;
    totalCostCents: number;
    products: OrderProduct[];
    createdAt: string;
    updatedAt: string;
}