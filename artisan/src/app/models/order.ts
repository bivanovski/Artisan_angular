import { Customer } from "./customer";
import { Product } from "./product";

export interface Order {
    id: number;
    quantity: number;
    orderDate: string;
    customer: Customer;
    products: Product[];
}
