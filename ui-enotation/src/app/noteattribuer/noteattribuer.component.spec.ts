import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteattribuerComponent } from './noteattribuer.component';

describe('NoteattribuerComponent', () => {
  let component: NoteattribuerComponent;
  let fixture: ComponentFixture<NoteattribuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteattribuerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoteattribuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
