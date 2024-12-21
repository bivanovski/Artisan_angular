import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtisanService } from '../../services/artisan.service';
import { Artisan } from '../../models/artisan';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  artisans: Artisan[] = [];
  selectedArtisanId: number | null = null;
  selectedArtisanName: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private artisanService: ArtisanService,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      artisanId: ['', Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      weight: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadArtisans();
  }

  loadArtisans(): void {
    this.artisanService.getArtisans().subscribe(
      (data) => {
        this.artisans = data;
      },
      (error) => {
        console.error('Error loading artisans:', error);
        this.snackBar.open('Failed to load artisans', 'Close', { duration: 3000 });
      }
    );
  }

  onArtisanSelect(event: any): void {
    const selectedArtisan = this.artisans.find(a => a.id === event.value);
    if (selectedArtisan) {
      this.selectedArtisanId = selectedArtisan.id;
      this.selectedArtisanName = selectedArtisan.artisanStoreName;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.productForm.valid && this.selectedArtisanId) {
      this.isSubmitting = true;
      
      const productData = {
        ...this.productForm.value,
        artisanId: this.selectedArtisanId
      };

      this.productService.addProduct(this.selectedArtisanId, productData).subscribe(
        () => {
          this.snackBar.open('Product added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding product:', error);
          this.snackBar.open('Failed to add product', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isSubmitting = false;
        }
      );
    } else if (!this.selectedArtisanId) {
      this.snackBar.open('Please select an artisan first', 'Close', {
        duration: 3000
      });
    }
  }
}