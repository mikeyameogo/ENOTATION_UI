import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNoteDashboardComponent } from './agent-note-dashboard.component';

describe('AgentNoteDashboardComponent', () => {
  let component: AgentNoteDashboardComponent;
  let fixture: ComponentFixture<AgentNoteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNoteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNoteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
