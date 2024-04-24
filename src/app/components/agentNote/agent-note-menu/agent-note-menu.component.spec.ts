import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNoteMenuComponent } from './agent-note-menu.component';

describe('AgentNoteMenuComponent', () => {
  let component: AgentNoteMenuComponent;
  let fixture: ComponentFixture<AgentNoteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentNoteMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNoteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
