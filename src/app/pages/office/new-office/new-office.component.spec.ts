import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfficeComponent } from './new-office.component';

describe('NewOfficeComponent', () => {
  let component: NewOfficeComponent;
  let fixture: ComponentFixture<NewOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NewOfficeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(NewOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
