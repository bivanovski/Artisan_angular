import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerReviewService } from '../../services/customer-review.service';
import { CustomerReview } from '../../models/customerReview';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-customer-review',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  templateUrl: './customer-review.component.html',
  styleUrl: './customer-review.component.css'
})
export class CustomerReviewComponent implements OnInit {
  reviewsByArtisan: { [key: string]: CustomerReview[] } = {};
  isLoading = true;

  constructor(
    private reviewService: CustomerReviewService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  private groupReviewsByArtisan(reviews: CustomerReview[]): void {
    this.reviewsByArtisan = reviews.reduce((groups, review) => {
      const key = review.artisan.artisanStoreName;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(review);
      return groups;
    }, {} as { [key: string]: CustomerReview[] });
  }

  private loadReviews(): void {
    this.isLoading = true;
    
    this.reviewService.getAllReviews().subscribe({
      next: (reviews) => {
        this.groupReviewsByArtisan(reviews);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}