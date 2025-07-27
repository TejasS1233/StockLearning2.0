import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Chatbot } from './chatbot/chatbot';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';
import { Topics } from './topics/topics';

// Topic details
import { StockBasicsComponent } from './topics/stock-basics/stock-basics';
import { InvestmentStrategiesComponent } from './topics/investment-strategies/investment-strategies';
import { RiskManagementComponent } from './topics/risk-management/risk-management';
// Added missing topic component imports
import { TechnicalAnalysisComponent } from './topics/technical-analysis/technical-analysis';
import { FundamentalAnalysisComponent } from './topics/fundamental-analysis/fundamental-analysis';
import { FuturesAndOptionsComponent } from './topics/futures-and-options/futures-and-options';
import { MutualFundsAndEtfsComponent } from './topics/mutual-funds-and-etfs/mutual-funds-and-etfs';
import { InvestorPsychologyComponent } from './topics/investor-psychology/investor-psychology';
import { InvestmentTaxationComponent } from './topics/investment-taxation/investment-taxation';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'chat', component: Chatbot },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'topics', component: Topics },
  
  // Topic Routes
  { path: 'topic/stock-basics', component: StockBasicsComponent },
  { path: 'topic/investment-strategies', component: InvestmentStrategiesComponent },
  { path: 'topic/risk-management', component: RiskManagementComponent },
  // Added missing topic routes
  { path: 'topic/technical-analysis', component: TechnicalAnalysisComponent },
  { path: 'topic/fundamental-analysis', component: FundamentalAnalysisComponent },
  { path: 'topic/futures-options', component: FuturesAndOptionsComponent },
  { path: 'topic/mutual-funds-etfs', component: MutualFundsAndEtfsComponent },
  { path: 'topic/investor-psychology', component: InvestorPsychologyComponent },
  { path: 'topic/taxation', component: InvestmentTaxationComponent },
];