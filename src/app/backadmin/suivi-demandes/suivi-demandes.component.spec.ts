import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviDemandesComponent } from './suivi-demandes.component';

describe('SuiviDemandesComponent', () => {
  let component: SuiviDemandesComponent;
  let fixture: ComponentFixture<SuiviDemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuiviDemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
