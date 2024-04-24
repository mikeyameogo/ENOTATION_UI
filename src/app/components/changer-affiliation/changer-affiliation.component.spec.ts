import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangerAffiliationComponent } from './changer-affiliation.component';

describe('ChangerAffiliationComponent', () => {
  let component: ChangerAffiliationComponent;
  let fixture: ComponentFixture<ChangerAffiliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangerAffiliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
