import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichesPosteComponent } from './fiches-poste.component';

describe('FichesPosteComponent', () => {
  let component: FichesPosteComponent;
  let fixture: ComponentFixture<FichesPosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichesPosteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichesPosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
