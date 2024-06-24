import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignProviderModalComponent } from './assign-provider-modal.component';

describe('AssignProviderModalComponent', () => {
  let component: AssignProviderModalComponent;
  let fixture: ComponentFixture<AssignProviderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignProviderModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignProviderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
