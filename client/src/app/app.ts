import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar,FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
