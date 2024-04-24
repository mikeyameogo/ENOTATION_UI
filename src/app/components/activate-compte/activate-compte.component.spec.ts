import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateCompteComponent } from './activate-compte.component';

describe('ActivateCompteComponent', () => {
  let component: ActivateCompteComponent;
  let fixture: ComponentFixture<ActivateCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
