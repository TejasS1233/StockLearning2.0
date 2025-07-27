import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html', // Make sure this points to your HTML file
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      this.error = "Please enter both email and password.";
      return;
    }
    this.error = null;

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log("Login successful", response);
        // Navigate to the main topics page or a dashboard on success
        this.router.navigate(['/topics']);
      },
      error: (err) => {
        // Display the error message from the backend
        this.error = err.error.msg || "Login failed. Please try again.";
        console.error("Login error", err);
      }
    });
  }
}
