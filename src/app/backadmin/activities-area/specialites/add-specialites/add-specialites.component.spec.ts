import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpecialitesComponent } from './add-specialites.component';

describe('AddSpecialitesComponent', () => {
  let component: AddSpecialitesComponent;
  let fixture: ComponentFixture<AddSpecialitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSpecialitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpecialitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
