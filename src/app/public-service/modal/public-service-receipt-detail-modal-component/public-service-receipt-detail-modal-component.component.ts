import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-public-service-receipt-detail-modal-component',
  templateUrl: './public-service-receipt-detail-modal-component.component.html',
  styleUrls: ['./public-service-receipt-detail-modal-component.component.css']
})
export class PublicServiceReceiptDetailModalComponent implements OnInit {
  publicServiceReceiptDetails: any;
  constructor(@Inject(MAT_DIALOG_DATA) public receiptDetail: DialogData) { }
  ngOnInit() {
   this.setValue();
  }
  setValue() {
this.publicServiceReceiptDetails = this.receiptDetail.data.Detalle;
  }
}


export interface DialogData {
  data: any;
}
