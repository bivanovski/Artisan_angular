import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ArtisanService } from '../../services/artisan.service';
import { MatDialogRef } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from '../../models/product';
import { DeleteProductComponent } from '../delete-product/delete-product.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-artisan-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './artisan-dialog.component.html',
  styleUrl: './artisan-dialog.component.css',
})
export class ArtisanDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ArtisanDialogComponent>,
    private artisanService: ArtisanService,
    private productService: ProductService
  ) {
    console.log('ArtisanDialog Data:', this.data);
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '500px',
      data: {
        product,
        artisanId: this.data.artisanId
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Get all products instead of single product
        this.artisanService.getArtisanById(this.data.artisanId).subscribe({
          next: (artisan) => {
            this.data.products = artisan.products;
          },
          error: (error) => console.error('Error fetching updated products:', error)
        });
      }
    });
  }

  openDeleteProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            // Refresh products list after deletion
            this.artisanService.getArtisanById(this.data.artisanId).subscribe({
              next: (artisan) => {
                this.data.products = artisan.products;
              },
              error: (error) => console.error('Error fetching updated products:', error)
            });
          },
          error: (error) => console.error('Error deleting product:', error)
        });
      }
    });
  }
}


