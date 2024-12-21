import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArtisanService } from '../../services/artisan.service';
import { Router } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-artisan',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-artisan.component.html',
  styleUrl: './add-artisan.component.css',
})
export class AddArtisanComponent {
  private readonly ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  artisanForm: FormGroup;
  isSubmitting: boolean = false;
  imagePreview: string | null = null;
  selectedFileName: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private artisanService: ArtisanService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.artisanForm = this.fb.group({
      artisanStoreName: ['', Validators.required],
      craft: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      socialMediaLink: ['', Validators.required],
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.artisanForm.valid) {
      this.isSubmitting = true;
      this.artisanService.addArtisan(this.artisanForm.value).subscribe(
        () => {
          this.snackBar.open('Artisan added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding artisan:', error);
          this.snackBar.open('Failed to add artisan', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isSubmitting = false;
        }
      );
    }
  }
}
