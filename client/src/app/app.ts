import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Chatbot } from './chatbot/chatbot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Chatbot],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-client';
}