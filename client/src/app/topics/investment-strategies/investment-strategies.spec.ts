import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentStrategiesComponent } from './investment-strategies';

describe('InvestmentStrategiesComponent', () => {
  let component: InvestmentStrategiesComponent;
  let fixture: ComponentFixture<InvestmentStrategiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentStrategiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentStrategiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
