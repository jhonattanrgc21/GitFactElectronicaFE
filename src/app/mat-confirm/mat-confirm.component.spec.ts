import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmComponent } from './mat-confirm.component';

describe('MatConfirmComponent', () => {
  let component: MatConfirmComponent;
  let fixture: ComponentFixture<MatConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
