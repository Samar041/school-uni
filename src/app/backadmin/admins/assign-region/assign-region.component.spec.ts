import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignRegionComponent } from './assign-region.component';

describe('AssignRegionComponent', () => {
  let component: AssignRegionComponent;
  let fixture: ComponentFixture<AssignRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRegionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
