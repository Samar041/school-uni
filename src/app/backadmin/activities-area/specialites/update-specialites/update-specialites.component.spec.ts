import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecialitesComponent } from './update-specialites.component';

describe('UpdateSpecialitesComponent', () => {
  let component: UpdateSpecialitesComponent;
  let fixture: ComponentFixture<UpdateSpecialitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecialitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSpecialitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
