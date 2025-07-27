import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockDataService } from '../../services/stock-data.service';
import { FooterComponent } from '../../footer/footer'; // Import your footer component

@Component({
  selector: 'app-investment-strategies',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './investment-strategies.html',
  styleUrls: ['./investment-strategies.css']
})
export class InvestmentStrategiesComponent implements OnInit {
  stocks: any[] = [];
  currentCategory = 'gainers';
  categories = [
    { key: 'gainers', label: 'Top Gainers' },
    { key: 'losers', label: 'Top Losers' },
    { key: 'volumeShockers', label: 'Volume Shockers' }
  ];

  constructor(private stockService: StockDataService) {}

  ngOnInit() {
    this.loadData(this.currentCategory);
  }

  loadData(category: string) {
    this.currentCategory = category;
    this.stockService.getStocks(category).subscribe(data => this.stocks = data);
  }
}
