import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-risk-management',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './risk-management.html',
  styleUrls: ['./risk-management.css']
})
export class RiskManagementComponent { }
