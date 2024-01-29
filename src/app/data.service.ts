import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError, finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersUrl = 'https://reqres.in/api/users';
  private usersCache = new Map<number, any>(); // Cache for paginated users
  private userDetailsCache = new Map<number, any>(); // Cache for individual user details
  public loading = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  // Fetch paginated user data
  getUsers(page: number = 1): Observable<any> {
    // Check if data is in cache
    if (this.usersCache.has(page)) {
      return of(this.usersCache.get(page)); // Return an Observable of the cached data
    }
    this.loading.next(true); // Start loading
    const url = `${this.usersUrl}?page=${page}`;
    return this.http.get(url).pipe(
      tap(response => this.usersCache.set(page, response)), // Cache the response
      map(response => response), // Transform the response if needed
      catchError(error => {
        console.error('Error fetching users:', error);
        return of(null); // Handle error and return a null value
      }),
      finalize(() => this.loading.next(false)) // End loading whether request is successful or not
    );
  }

  // Fetch details for a single user
  getUserById(id: number): Observable<any> {
    // Check if data is in cache
    if (this.userDetailsCache.has(id)) {
      return of(this.userDetailsCache.get(id)); // Return an Observable of the cached data
    }
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url).pipe(
      tap(response => this.userDetailsCache.set(id, response)), // Cache the response
      map(response => response) // You can add any necessary transformation here
    );
  }
}
