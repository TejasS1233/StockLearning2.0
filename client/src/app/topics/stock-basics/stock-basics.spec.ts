import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockBasicsComponent } from './stock-basics';

describe('StockBasicsComponent', () => {
  let component: StockBasicsComponent;
  let fixture: ComponentFixture<StockBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockBasicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
