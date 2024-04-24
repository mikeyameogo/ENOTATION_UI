import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeActiviteComponent } from './propose-activite.component';

describe('ProposeActiviteComponent', () => {
  let component: ProposeActiviteComponent;
  let fixture: ComponentFixture<ProposeActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposeActiviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposeActiviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
