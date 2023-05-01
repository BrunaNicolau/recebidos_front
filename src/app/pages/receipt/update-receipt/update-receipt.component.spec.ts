import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceiptComponent } from './update-receipt.component';

describe('UpdateReceiptComponent', () => {
  let component: UpdateReceiptComponent;
  let fixture: ComponentFixture<UpdateReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReceiptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
