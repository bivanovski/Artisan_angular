import { Component, OnInit } from '@angular/core';
import { Artisan } from '../../models/artisan';
import { ArtisanService } from '../../services/artisan.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArtisanDialogComponent } from '../artisan-dialog/artisan-dialog.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeleteArtisanComponent } from '../delete-artisan/delete-artisan.component';
import { EditArtisanComponent } from '../edit-artisan/edit-artisan.component';

@Component({
  selector: 'app-artisans-list',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './artisans-list.component.html',
  styleUrl: './artisans-list.component.css',
})
export class ArtisansListComponent implements OnInit {
  artisans: Artisan[] = [];
  errorMessage: string = '';
  loading: boolean = false;
  readonly defaultImage = 'assets/images/default-artisan.webp';

  constructor(
    private artisanService: ArtisanService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadArtisans();
  }

  getArtisanImage(): string {
    return this.defaultImage;
  }

  loadArtisans(): void {
    this.loading = true;
    this.artisanService.getArtisans().subscribe(
      (data) => {
        this.artisans = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching artisans:', error);
        this.errorMessage = 'Failed to load artisans. Please try again.';
        this.loading = false;
      }
    );
  }

  openDialog(artisan: Artisan): void {
    const dialogRef = this.dialog.open(ArtisanDialogComponent, {
      data: { products: artisan.products, artisanId: artisan.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  editArtisan(artisan: Artisan): void {
    const dialogRef = this.dialog.open(EditArtisanComponent, {
      width: '400px',
      data: { artisan },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadArtisans();
      }
    });
  }

  deleteArtisan(artisan: Artisan): void {
    const dialogRef = this.dialog.open(DeleteArtisanComponent, {
      width: '250px',
      data: { artisanStoreName: artisan.artisanStoreName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.artisanService.deleteArtisan(artisan).subscribe(
          () => {
            this.artisans = this.artisans.filter((a) => a.id !== artisan.id);
            console.log('Artisan deleted:', artisan);
          },
          (error) => {
            console.error('Error deleting artisan:', error);
            this.errorMessage = 'Failed to delete artisan. Please try again.';
          }
        );
      }
    });
  }
}
