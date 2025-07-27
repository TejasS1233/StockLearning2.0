import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalAnalysisComponent } from './fundamental-analysis';

describe('FundamentalAnalysisComponent', () => {
  let component: FundamentalAnalysisComponent;
  let fixture: ComponentFixture<FundamentalAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundamentalAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundamentalAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
