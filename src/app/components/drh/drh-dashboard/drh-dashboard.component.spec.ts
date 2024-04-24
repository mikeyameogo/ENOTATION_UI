import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhDashboardComponent } from './drh-dashboard.component';

describe('DrhDashboardComponent', () => {
  let component: DrhDashboardComponent;
  let fixture: ComponentFixture<DrhDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrhDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrhDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
