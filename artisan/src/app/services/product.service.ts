import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://artisan-azure-demo.azurewebsites.net';
  private productUrl = `${this.apiUrl}/product`;
  private artisanUrl = `${this.apiUrl}/artisan`;

  constructor(private http: HttpClient) {}

  getProductById(productId: number): Observable<Product> {
    return this.http
      .get<Product>(`${this.productUrl}/${productId}`, {
        withCredentials: true,
      })
      .pipe(
        retry(2),
        tap((product) => console.log('Fetched product:', product)),
        catchError(this.handleError)
      );
  }

  addProduct(artisanId: number, product: any): Observable<any> {
    const url = `${this.artisanUrl}/${artisanId}/add-product`;
    return this.http.post<any>(url, product).pipe(
      tap((newProduct) => console.log('Added product:', newProduct)),
      catchError(this.handleError)
    );
  }

  updateProduct(
    productId: number,
    artisanId: number,
    product: any
  ): Observable<any> {
    const url = `${this.artisanUrl}/update-product/${productId}/${artisanId}`;
    console.log('Updating product at URL:', url);

    return this.http
      .put<any>(url, product, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .pipe(
        tap((updatedProduct) =>
          console.log('Updated product:', updatedProduct)
        ),
        catchError((error) => {
          console.error('Update error:', error);
          return throwError(
            () => new Error(`Failed to update product ${productId}`)
          );
        })
      );
  }

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.productUrl}/${productId}`;

    return this.http
      .delete<void>(url, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .pipe(
        tap(() => console.log('Deleted product:', productId)),
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
