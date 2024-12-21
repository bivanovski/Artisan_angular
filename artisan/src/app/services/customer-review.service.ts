import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerReview } from '../models/customerReview';

@Injectable({
  providedIn: 'root'
})
export class CustomerReviewService {

  private apiUrl = 'https://artisan-azure-demo.azurewebsites.net/customer-review';

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<CustomerReview[]> {
    return this.http.get<CustomerReview[]>(this.apiUrl);
  }

  getReviewById(id: number): Observable<CustomerReview> {
    return this.http.get<CustomerReview>(`${this.apiUrl}/${id}`);
  }
}
