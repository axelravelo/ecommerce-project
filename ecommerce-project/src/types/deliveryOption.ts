export interface DeliveryOption {
    id: string;
    deliveryDays: number;
    priceCents: number;
    createdAt: string;
    updatedAt: string;
    estimatedDeliveryTimeMs : number
}