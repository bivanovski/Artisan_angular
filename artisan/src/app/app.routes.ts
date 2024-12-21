import { Routes } from '@angular/router';
import { AddArtisanComponent } from './artisans/add-artisan/add-artisan.component';
import { ArtisansListComponent } from './artisans/artisans-list/artisans-list.component';
import { AddProductComponent } from './artisans/add-product/add-product.component';
import { EditArtisanComponent } from './artisans/edit-artisan/edit-artisan.component';
import { DeleteArtisanComponent } from './artisans/delete-artisan/delete-artisan.component';
import { OrderListComponent } from './artisans/order-list/order-list.component';
import { CustomerReviewComponent } from './artisans/customer-review/customer-review.component';

export const routes: Routes = [
    { path: '', component: ArtisansListComponent },            // Default route
    { path: 'edit-artisan/:id', component: EditArtisanComponent },  // Redirect to artisan list on default
    { path: 'delete-artisan/:id', component: DeleteArtisanComponent }, // Route for deleting artisan
    { path: 'add-artisan', component: AddArtisanComponent },    // Route for adding artisan     // Route for artisan list
    { path: 'add-product/:id', component: AddProductComponent }, // Route for adding product with artisan ID
    { path: 'order', component: OrderListComponent },
    { path: 'customer-review', component: CustomerReviewComponent },
];
