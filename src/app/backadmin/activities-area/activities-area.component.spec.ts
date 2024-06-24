import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesAreaComponent } from './activities-area.component';

describe('ActivitiesAreaComponent', () => {
  let component: ActivitiesAreaComponent;
  let fixture: ComponentFixture<ActivitiesAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
