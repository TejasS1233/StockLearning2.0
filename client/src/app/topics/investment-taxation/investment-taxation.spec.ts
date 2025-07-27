import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentTaxationComponent } from './investment-taxation';

describe('InvestmentTaxationComponent', () => {
  let component: InvestmentTaxationComponent;
  let fixture: ComponentFixture<InvestmentTaxationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentTaxationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentTaxationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
