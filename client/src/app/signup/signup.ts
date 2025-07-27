import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Adjust path if needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule], // Use FormsModule
  templateUrl: './signup.html', // Ensure your template is named correctly
})
export class SignupComponent {
  // Properties to bind to the form inputs
  name = '';
  email = '';
  password = '';
  
  // Properties for user feedback
  error: string | null = null;
  successMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    // Basic validation
    if (!this.name || !this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    // Reset messages before making the call
    this.error = null;
    this.successMessage = null;

    // Call the async register method and subscribe to the result
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        // Handle successful registration
        this.successMessage = "Registration successful! Redirecting to login...";
        console.log('Registration successful', response);
        
        // Redirect to login page after a short delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        // Handle errors from the backend
        this.error = err.error.msg || 'An unknown error occurred. Please try again.';
        console.error('Registration error', err);
      }
    });
  }
}
