import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ListboxModule } from 'primeng/listbox';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DividerModule, ListboxModule,RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  sidebarLinks = [
    { label: 'Stocks' },
    { label: 'National Stock Exchange' },
    { label: 'Bombay Stock Exchange' },
    { label: 'FII DII Activity' },
    { label: 'What is SENSEX' },
    { label: 'Stock Exchange' },
    { label: 'Multibagger Stocks' },
    { label: 'Penny Stocks' },
    { label: 'Stock Broker' },
    { label: 'Stock Trading' },
    { label: 'Nifty' },
    { label: 'Mid Cap Stocks' },
    { label: 'Small Cap Stocks' },
    { label: 'Large Cap Stocks' },
    { label: 'Blue Chip Stocks or Companies' },
    { label: 'Stock Market Timings' },
    { label: 'NSE Holidays' }
  ];
}
