import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReceiptsComponent } from './list-receipt.component';

describe('ListReceiptsComponent', () => {
  let component: ListReceiptsComponent;
  let fixture: ComponentFixture<ListReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReceiptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
