import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutualFundsAndEtfsComponent } from './mutual-funds-and-etfs';

describe('MutualFundsAndEtfsComponent', () => {
  let component: MutualFundsAndEtfsComponent;
  let fixture: ComponentFixture<MutualFundsAndEtfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MutualFundsAndEtfsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MutualFundsAndEtfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
