import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReceiptComponent } from './edit-receipt.component';

describe('EditReceiptComponent', () => {
  let component: EditReceiptComponent;
  let fixture: ComponentFixture<EditReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
