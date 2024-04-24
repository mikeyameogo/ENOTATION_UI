import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNotaireMenuComponent } from './agent-notaire-menu.component';

describe('AgentNotaireMenuComponent', () => {
  let component: AgentNotaireMenuComponent;
  let fixture: ComponentFixture<AgentNotaireMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNotaireMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNotaireMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
