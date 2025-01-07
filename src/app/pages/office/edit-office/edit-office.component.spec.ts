import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOfficeComponent } from './edit-office.component';

describe('EditOfficeComponent', () => {
  let component: EditOfficeComponent;
  let fixture: ComponentFixture<EditOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EditOfficeComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(EditOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
