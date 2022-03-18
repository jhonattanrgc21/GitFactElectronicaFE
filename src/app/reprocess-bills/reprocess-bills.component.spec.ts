import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocessBillSComponent } from './reprocess-bills.component';

describe('ReprocessComponent', () => {
  let component: ReprocessBillSComponent;
  let fixture: ComponentFixture<ReprocessBillSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprocessBillSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocessBillSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
