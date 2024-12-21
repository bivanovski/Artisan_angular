import { CustomerReview } from './customerReview';
import { Product } from './product';

  export interface Artisan {
    id: number;
    artisanStoreName: string;
    craft: string;
    address: string;
    email: string;
    socialMediaLink: string;
    showButton: boolean;
    products: Product[];
    image?: string;
    reviews: CustomerReview[];
  }