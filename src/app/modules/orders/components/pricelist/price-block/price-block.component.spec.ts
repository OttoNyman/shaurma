import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceBlockComponent } from './price-block.component';

describe('PriceBlockComponent', () => {
  let component: PriceBlockComponent;
  let fixture: ComponentFixture<PriceBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
