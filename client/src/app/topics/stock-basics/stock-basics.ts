import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-stock-basics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stock-basics.html',
  styleUrls: ['./stock-basics.css']
})
export class StockBasicsComponent { }
