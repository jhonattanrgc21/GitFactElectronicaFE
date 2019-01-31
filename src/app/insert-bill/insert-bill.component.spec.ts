import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertBillComponent } from './insert-bill.component';

describe('InsuranceComponent', () => {
  let component: InsertBillComponent;
  let fixture: ComponentFixture<InsertBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
