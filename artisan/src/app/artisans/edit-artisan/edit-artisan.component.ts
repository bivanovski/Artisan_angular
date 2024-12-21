import { Component, Inject, OnInit } from '@angular/core';
import { Artisan } from '../../models/artisan';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArtisanService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-artisan',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-artisan.component.html',
  styleUrl: './edit-artisan.component.css'
})
export class EditArtisanComponent implements OnInit {
  artisanForm!: FormGroup;
  artisan: Artisan;

  constructor(
    public dialogRef: MatDialogRef<EditArtisanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { artisan: Artisan },
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private artisanService: ArtisanService
  ) {
    this.artisan = data.artisan;
  }

  ngOnInit(): void {
    this.artisanForm = this.fb.group({
      artisanStoreName: [this.artisan.artisanStoreName, Validators.required],
      craft: [this.artisan.craft, Validators.required],
      address: [this.artisan.address, Validators.required],
      email: [this.artisan.email, [Validators.required, Validators.email]],
      socialMediaLink: [this.artisan.socialMediaLink, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.artisanForm.valid) {
      const updatedArtisan = {
        ...this.artisan,
        ...this.artisanForm.value
      };

      this.artisanService.updateArtisan(updatedArtisan).subscribe({
        next: () => {
          this.snackBar.open('Artisan updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Update failed:', error);
          this.snackBar.open('Failed to update artisan', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}