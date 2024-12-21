import { Injectable } from '@angular/core';
import { Artisan } from '../models/artisan';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
  private apiUrl = 'https://artisan-azure-demo.azurewebsites.net/artisan';

  constructor(private http: HttpClient) {}

  getArtisans(): Observable<Artisan[]> {
    return this.http
      .get<Artisan[]>(this.apiUrl, { withCredentials: true })
      .pipe(
        retry(3),
        tap((artisans) => console.log('Fetched artisans:', artisans)),
        catchError(this.handleError)
      );
  }

  getArtisanById(id: number): Observable<Artisan> {
    return this.http
      .get<Artisan>(`${this.apiUrl}/${id}`, { withCredentials: true })
      .pipe(
        retry(2),
        tap((artisan) => console.log('Fetched artisan:', artisan)),
        catchError(this.handleError)
      );
  }

 
  addArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http
      .post<Artisan>(this.apiUrl, artisan, { withCredentials: true })
      .pipe(
        tap((newArtisan) => console.log('Added artisan:', newArtisan)),
        catchError(this.handleError)
      );
  }

  updateArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http
      .put<Artisan>(this.apiUrl, artisan, { withCredentials: true })
      .pipe(
        tap((updatedArtisan) =>
          console.log('Updated artisan:', updatedArtisan)
        ),
        catchError(this.handleError)
      );
  }

  deleteArtisan(artisan: Artisan): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${artisan.id}`, { withCredentials: true })
      .pipe(
        tap(() => console.log('Deleted artisan ID:', artisan.id)),
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
