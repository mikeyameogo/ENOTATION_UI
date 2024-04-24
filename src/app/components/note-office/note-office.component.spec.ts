import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteOfficeComponent } from './note-office.component';

describe('NoteOfficeComponent', () => {
  let component: NoteOfficeComponent;
  let fixture: ComponentFixture<NoteOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
