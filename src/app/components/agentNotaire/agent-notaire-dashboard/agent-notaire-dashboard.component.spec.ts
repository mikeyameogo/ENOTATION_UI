import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNotaireDashboardComponent } from './agent-notaire-dashboard.component';

describe('AgentNotaireDashboardComponent', () => {
  let component: AgentNotaireDashboardComponent;
  let fixture: ComponentFixture<AgentNotaireDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNotaireDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNotaireDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
