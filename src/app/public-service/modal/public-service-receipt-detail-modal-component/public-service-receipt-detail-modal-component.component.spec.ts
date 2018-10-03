import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServiceReceiptDetailModalComponentComponent } from './public-service-receipt-detail-modal-component.component';

describe('PublicServiceReceiptDetailModalComponentComponent', () => {
  let component: PublicServiceReceiptDetailModalComponentComponent;
  let fixture: ComponentFixture<PublicServiceReceiptDetailModalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicServiceReceiptDetailModalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicServiceReceiptDetailModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
