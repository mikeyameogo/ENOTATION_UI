import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhLandingComponent } from './drh-landing.component';

describe('DrhLandingComponent', () => {
  let component: DrhLandingComponent;
  let fixture: ComponentFixture<DrhLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrhLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrhLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
