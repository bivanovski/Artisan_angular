import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatLabel, MatInputModule, MatCardModule, MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  editProductForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, artisanId: number },
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<EditProductComponent>,
    private snackBar: MatSnackBar
  ) {
    console.log('Dialog Data:', data);  // Debug log
    if (!data.artisanId) {
      console.error('Missing artisanId in dialog data');
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    console.log('Initializing form with product:', this.data.product); // Debug log
    this.editProductForm = this.fb.group({
      name: [this.data.product.name, Validators.required],
      category: [this.data.product.category, Validators.required],
      price: [this.data.product.price, [Validators.required, Validators.min(0)]],
      weight: [this.data.product.weight, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      const updatedProduct = {
        ...this.data.product,
        ...this.editProductForm.value
      };

      this.productService.updateProduct(updatedProduct.id, this.data.artisanId, updatedProduct)
        .subscribe({
          next: (response) => {
            console.log('Update successful:', response);
            this.snackBar.open('Product updated successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-success']
            });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Update failed:', error);
            this.snackBar.open('Failed to update product', 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            });
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}