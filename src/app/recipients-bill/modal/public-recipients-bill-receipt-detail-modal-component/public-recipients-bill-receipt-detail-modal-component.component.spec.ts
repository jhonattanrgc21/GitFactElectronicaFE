import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRecipientsBillReceiptDetailModalComponent } from './public-recipients-bill-receipt-detail-modal-component.component';

describe('PublicServiceReceiptDetailModalComponentComponent', () => {
  let component: PublicRecipientsBillReceiptDetailModalComponent;
  let fixture: ComponentFixture<PublicRecipientsBillReceiptDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicRecipientsBillReceiptDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRecipientsBillReceiptDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
