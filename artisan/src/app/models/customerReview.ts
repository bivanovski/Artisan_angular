import { Artisan } from "./artisan";

export interface CustomerReview {
    id: number;
    description: string;
    rating: number;
    artisan: Artisan;
}