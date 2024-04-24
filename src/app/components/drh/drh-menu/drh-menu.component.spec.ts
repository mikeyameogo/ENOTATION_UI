import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrhMenuComponent } from './drh-menu.component';

describe('DrhMenuComponent', () => {
  let component: DrhMenuComponent;
  let fixture: ComponentFixture<DrhMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrhMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrhMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
