import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://artisan-azure-demo.azurewebsites.net/order';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { withCredentials: true })
      .pipe(
        retry(3),
        tap(orders => console.log('Fetched orders:', orders)),
        catchError(this.handleError)
      );
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`, { withCredentials: true })
      .pipe(
        tap(order => console.log(`Fetched order id=${id}`)),
        catchError(this.handleError)
      );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}`; // Use base URL for PUT request
    console.log('Sending PUT request to:', url);
    console.log('Order data being sent:', order);
    
    return this.http.put<Order>(url, order, { withCredentials: true })
      .pipe(
        tap(response => {
          console.log('Update response:', response);
        }),
        catchError(error => {
          console.error('Update error details:', error);
          return throwError(() => new Error(`Server error: ${error.status}, message: ${error.message}`));
        })
      );
  }
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}`, { withCredentials: true })
      .pipe(
        tap(_ => console.log(`Deleted order id=${orderId}`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}