import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalAnalysisComponent } from './technical-analysis';

describe('TechnicalAnalysisComponent', () => {
  let component: TechnicalAnalysisComponent;
  let fixture: ComponentFixture<TechnicalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
