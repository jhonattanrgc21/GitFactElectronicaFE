import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCodopComponent } from './insert-codop.component';

describe('InsertCodopComponent', () => {
  let component: InsertCodopComponent;
  let fixture: ComponentFixture<InsertCodopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCodopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCodopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
