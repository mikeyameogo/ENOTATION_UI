import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLandingComponent } from './agent-landing.component';

describe('AgentLandingComponent', () => {
  let component: AgentLandingComponent;
  let fixture: ComponentFixture<AgentLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
