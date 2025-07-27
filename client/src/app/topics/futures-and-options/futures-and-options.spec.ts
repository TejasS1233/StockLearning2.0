import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturesAndOptionsComponent } from './futures-and-options';

describe('FuturesAndOptionsComponent', () => {
  let component: FuturesAndOptionsComponent;
  let fixture: ComponentFixture<FuturesAndOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuturesAndOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuturesAndOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
