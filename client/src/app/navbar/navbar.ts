import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // Adjust path if needed

// Define the User interface
interface User {
  id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ensure RouterModule is imported for routerLink
  templateUrl: './navbar.html',
})
export class Navbar {
  // This public property holds the live stream of user data
  public currentUser$: Observable<User | null>;

  constructor(private authService: AuthService, private router: Router) {
    // Connect the component's observable to the service's observable
    this.currentUser$ = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
