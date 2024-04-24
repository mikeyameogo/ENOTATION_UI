import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinistereInstitutionComponent } from './ministere-institution.component';

describe('MinistereInstitutionComponent', () => {
  let component: MinistereInstitutionComponent;
  let fixture: ComponentFixture<MinistereInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinistereInstitutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinistereInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
