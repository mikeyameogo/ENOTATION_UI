import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNotaireLandingComponent } from './agent-notaire-landing.component';

describe('AgentNotaireLandingComponent', () => {
  let component: AgentNotaireLandingComponent;
  let fixture: ComponentFixture<AgentNotaireLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNotaireLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNotaireLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
