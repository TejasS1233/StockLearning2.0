import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Stock {
  company: string;
  price: number;
  change: string;
  volume: string;
}

type StockCategory = 'gainers' | 'losers' | 'volumeShockers';

@Injectable({
  providedIn: 'root'
})
export class StockDataService {
  private apiKey = environment.alphaVantageApiKey;
  private apiUrl = 'https://www.alphavantage.co/query';

  private marketDataCache$: Observable<any> | null = null;

  // Expanded static fallback data
  private fallbackData = {
    gainers: [
      { company: 'Reliance Industries', price: 2450, change: '+30 (+1.24%)', volume: '3,20,000' },
      { company: 'Tata Motors', price: 560, change: '+12 (+2.18%)', volume: '4,10,500' },
      { company: 'Wipro', price: 425, change: '+15 (+3.66%)', volume: '5,00,000' },
      { company: 'JSW Steel', price: 750, change: '+28 (+3.87%)', volume: '2,30,000' },
      { company: 'Bharti Airtel', price: 865, change: '+10 (+1.17%)', volume: '6,70,000' },
      { company: 'UltraTech Cement', price: 8500, change: '+150 (+1.80%)', volume: '1,25,000' },
      { company: 'Maruti Suzuki', price: 9300, change: '+100 (+1.09%)', volume: '95,000' },
      { company: 'Hindustan Unilever', price: 2600, change: '+25 (+0.97%)', volume: '3,80,000' },
      { company: 'Asian Paints', price: 3200, change: '+40 (+1.27%)', volume: '2,10,000' },
      { company: 'Power Grid', price: 240, change: '+5 (+2.12%)', volume: '7,50,000' }
    ],
    losers: [
      { company: 'Infosys', price: 1480, change: '-25 (-1.66%)', volume: '2,85,400' },
      { company: 'HDFC Bank', price: 1550, change: '-18 (-1.15%)', volume: '1,95,000' },
      { company: 'ICICI Bank', price: 1220, change: '-20 (-1.61%)', volume: '3,10,000' },
      { company: 'Kotak Mahindra Bank', price: 1760, change: '-30 (-1.67%)', volume: '2,20,000' },
      { company: 'Tech Mahindra', price: 1120, change: '-28 (-2.43%)', volume: '2,50,000' },
      { company: 'SBI Life Insurance', price: 1280, change: '-35 (-2.66%)', volume: '1,80,000' },
      { company: 'Grasim Industries', price: 1825, change: '-40 (-2.14%)', volume: '1,50,000' },
      { company: 'Britannia Industries', price: 5200, change: '-75 (-1.42%)', volume: '80,000' },
      { company: 'Nestle India', price: 25000, change: '-300 (-1.18%)', volume: '50,000' },
      { company: 'Adani Green Energy', price: 920, change: '-50 (-5.15%)', volume: '6,00,000' }
    ],
    volumeShockers: [
      { company: 'Adani Ports', price: 720, change: '+8 (+1.12%)', volume: '9,80,000' },
      { company: 'ITC', price: 450, change: '+2 (+0.44%)', volume: '7,20,000' },
      { company: 'NTPC', price: 210, change: '+5 (+2.44%)', volume: '12,00,000' },
      { company: 'Coal India', price: 240, change: '+6 (+2.56%)', volume: '10,50,000' },
      { company: 'Tata Steel', price: 125, change: '+4 (+3.31%)', volume: '13,20,000' },
      { company: 'ONGC', price: 170, change: '+3 (+1.79%)', volume: '11,40,000' },
      { company: 'IndusInd Bank', price: 1050, change: '+20 (+1.94%)', volume: '9,50,000' },
      { company: 'Axis Bank', price: 950, change: '+15 (+1.60%)', volume: '8,80,000' },
      { company: 'Mahindra & Mahindra', price: 1600, change: '+35 (+2.24%)', volume: '7,90,000' },
      { company: 'Sun Pharma', price: 950, change: '+12 (+1.28%)', volume: '7,30,000' }
    ]
  };

  constructor(private http: HttpClient) {}

  private getTopGainersAndLosers(): Observable<{ gainers: Stock[], losers: Stock[], volumeShockers: Stock[] }> {
    if (this.marketDataCache$) {
      return this.marketDataCache$;
    }

    const url = `${this.apiUrl}?function=TOP_GAINERS_LOSERS&apikey=${this.apiKey}`;

    this.marketDataCache$ = this.http.get<any>(url).pipe(
      map(response => {
        if (response.Note) {
          console.warn('Alpha Vantage API limit hit:', response.Note);
          return this.fallbackData;
        }

        if (!response.top_gainers || !response.top_losers || !response.most_actively_traded) {
          console.error('Alpha Vantage API Error: Invalid or incomplete data format received.', response);
          return this.fallbackData;
        }

        const gainers = response.top_gainers.map((stock: any): Stock => ({
          company: stock.ticker,
          price: parseFloat(stock.price),
          change: `${stock.change_amount} (${stock.change_percentage})`,
          volume: this.formatVolume(stock.volume),
        }));

        const losers = response.top_losers.map((stock: any): Stock => ({
          company: stock.ticker,
          price: parseFloat(stock.price),
          change: `${stock.change_amount} (${stock.change_percentage})`,
          volume: this.formatVolume(stock.volume),
        }));

        const volumeShockers = response.most_actively_traded.map((stock: any): Stock => ({
          company: stock.ticker,
          price: parseFloat(stock.price),
          change: `${stock.change_amount} (${stock.change_percentage})`,
          volume: this.formatVolume(stock.volume),
        }));

        return { gainers, losers, volumeShockers };
      }),
      catchError(error => {
        console.error('HTTP Error fetching stock data:', error);
        this.marketDataCache$ = null;
        return of(this.fallbackData);
      })
    );

    return this.marketDataCache$;
  }

  getStocks(category: string): Observable<Stock[]> {
    if (category !== 'gainers' && category !== 'losers' && category !== 'volumeShockers') {
      console.error(`Invalid stock category requested: "${category}"`);
      return of([]);
    }

    return this.getTopGainersAndLosers().pipe(
      map(marketData => marketData[category as StockCategory] || [])
    );
  }

  private formatVolume(volume: string): string {
    const num = parseInt(volume, 10);
    return isNaN(num) ? 'N/A' : num.toLocaleString('en-IN');
  }
}
