import { Component, OnInit } from '@angular/core';
import { Artisan } from '../../models/artisan';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ArtisanService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-artisan-selection-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './artisan-selection-dialog.component.html',
  styleUrl: './artisan-selection-dialog.component.css',
})
export class ArtisanSelectionDialogComponent implements OnInit {
  artisans: Artisan[] = [];
  selectedArtisanId: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<ArtisanSelectionDialogComponent>,
    private artisanService: ArtisanService
  ) {}

  ngOnInit() {
    this.loadArtisans();
  }

  loadArtisans() {
    this.artisanService
      .getArtisans()
      .subscribe((artisans) => (this.artisans = artisans));
  }

  onArtisanSelected(artisanId: number) {
    this.selectedArtisanId = artisanId;
  }

  confirm() {
    this.dialogRef.close(this.selectedArtisanId);
  }
}
