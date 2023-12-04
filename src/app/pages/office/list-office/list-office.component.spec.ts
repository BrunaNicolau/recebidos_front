import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfficesComponent } from './list-office.component';

describe('ListOfficesComponent', () => {
  let component: ListOfficesComponent;
  let fixture: ComponentFixture<ListOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfficesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
