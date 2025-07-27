import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

// Define a simple User interface
interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8001/api/auth';
  
  // A BehaviorSubject holds the current user value and broadcasts it to subscribers.
  // We initialize it with null, meaning no user is logged in initially.
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  
  // Expose the current user state as an Observable. Components will subscribe to this.
  // The '$' is a common convention for Observables.
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<{user: User}> {
    return this.http.post<{user: User}>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        // On successful login, broadcast the new user data to all subscribers.
        this.currentUserSubject.next(response.user);
        // In a real app, you would also store a JWT token in localStorage here.
      })
    );
  }

  logout() {
    // On logout, broadcast 'null' to indicate no user is logged in.
    this.currentUserSubject.next(null);
    // In a real app, you would also remove the token from localStorage.
  }

  // A synchronous way to get the current user value if needed.
  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  // A synchronous way to check if the user is authenticated.
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.getValue();
  }
}
