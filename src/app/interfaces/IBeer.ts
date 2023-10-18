export interface IBeer{
    id: number;
    name: string;
    tagline:string;
    image_url: string;
    price?: number;
    favourite?: boolean;
    in_cart?: boolean;
    in_cart_amount?: number;
}