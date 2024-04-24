import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonCodeComponent } from './mon-code.component';

describe('MonCodeComponent', () => {
  let component: MonCodeComponent;
  let fixture: ComponentFixture<MonCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
