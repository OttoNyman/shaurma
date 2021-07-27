import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithBtnComponent } from './input-with-btn.component';

describe('InputWithBtnComponent', () => {
  let component: InputWithBtnComponent;
  let fixture: ComponentFixture<InputWithBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
