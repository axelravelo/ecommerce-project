export interface Product {
    id: string;
    image: string;
    name: string;
    rating: {
        stars: number;
        count: number;
    };
    priceCents: number;
    keywords: string[];
    createdAt?: string;
    updatedAt?: string;
}