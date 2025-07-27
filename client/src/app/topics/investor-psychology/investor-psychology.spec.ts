import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorPsychologyComponent } from './investor-psychology';

describe('InvestorPsychologyComponent', () => {
  let component: InvestorPsychologyComponent;
  let fixture: ComponentFixture<InvestorPsychologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestorPsychologyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorPsychologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
