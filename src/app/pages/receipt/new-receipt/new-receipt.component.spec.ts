import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReceiptComponent } from './new-receipt.component';

describe('NewReceiptComponent', () => {
  let component: NewReceiptComponent;
  let fixture: ComponentFixture<NewReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
