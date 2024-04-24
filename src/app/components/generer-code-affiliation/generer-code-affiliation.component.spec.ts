import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererCodeAffiliationComponent } from './generer-code-affiliation.component';

describe('GenererCodeAffiliationComponent', () => {
  let component: GenererCodeAffiliationComponent;
  let fixture: ComponentFixture<GenererCodeAffiliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenererCodeAffiliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenererCodeAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
