import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-artisan',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './delete-artisan.component.html',
  styleUrl: './delete-artisan.component.css'
})
export class DeleteArtisanComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteArtisanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { artisanStoreName: string },
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.snackBar.open('Product deleted successfully', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
    this.dialogRef.close(true);
  }
}

