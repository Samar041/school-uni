import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBackadminComponent } from './header-backadmin.component';

describe('HeaderBackadminComponent', () => {
  let component: HeaderBackadminComponent;
  let fixture: ComponentFixture<HeaderBackadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBackadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBackadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
