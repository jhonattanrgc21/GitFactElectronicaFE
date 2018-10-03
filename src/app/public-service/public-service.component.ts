import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Input, OnChanges } from '@angular/core';
import { PublicServiceServiceService } from '../services/public-service-service.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatSnackBar, MatDialog } from '@angular/material';
// tslint:disable-next-line:max-line-length
import { PublicServiceReceiptDetailModalComponent } from './modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component';

@Component({
  selector: 'app-public-service',
  templateUrl: './public-service.component.html',
  styleUrls: ['./public-service.component.css']
})
export class PublicServiceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  publicServiceReceiptRows: Object = {};
  validArgs = false;
  isActLengthCorrect = 'true';
  isCrdLengthCorrect = 'true';
  isLoadingResults = false;
  

  @Input() state: any;
  @Input() paymethod: any;
  @Input() salecondition: any;
  @Input() cartera: any;
  @Input() doctype: any;

  receiptDetail: any;

  @Input() identification : String;
  @Input() accountNumber = '';
  @Input() cardNumber: String;
  @Input() dateFrom: String = '';
  @Input() dateTo: String = '';
  @Input() amountFrom: String;
  @Input() amountTo: String;
  @Input() publicService: String;

  docTypeList: any; 
  carteraList: any; 
  stateList: any; 
  payMethodList: any; 
  saleConditionList: any;
  receiptsList: DataPubServ;

  constructor(private publicServiceService: PublicServiceServiceService, private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar) {
    this.accountNumber = '';
    this.cardNumber = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.amountFrom = '';
    this.amountTo = '';
  }

  tableData: any;

  publicServices = new FormControl();
  publicServicesList: PublicServicesList[];

  displayedColumns: string[] = ['accountNumber', 'cardNumber', 'publicService', 'currency', 'amount',
    'date', 'invoiceNumber', 'transactionNumber', 'voucher', 'channel', 'actions'];

  dataSource = new MatTableDataSource<PublicServiceReceipts>();

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkArgs() {
    if (this.accountNumber == null) {
      this.accountNumber = '';
    }

    if (this.identification == null) {
      this.identification = '';
    }
    if (this.dateFrom == null) {
      this.dateFrom = '';
    }
    if (this.dateTo == null) {
      this.dateTo = '';
    }
    if (this.amountFrom == null) {
      this.amountFrom = '';
    }
    if (this.amountTo == null) {
      this.amountTo = '';
    }
    if (this.state == null) {
      this.state = '';
    }
    if (this.paymethod == null) {
      this.paymethod = '';
    }
    if (this.salecondition == null) {
      this.salecondition = '';
    }
    if (this.cartera == null) {
      this.cartera = '';
    }
    if (this.doctype == null) {
      this.doctype = '';
    }
    if ((this.accountNumber.length > 6)) {
      this.isActLengthCorrect = 'true';
    } else {
      this.isActLengthCorrect = 'false';
    }
    if (this.cardNumber.toString().length > 15) {
      this.isCrdLengthCorrect = 'true';
    } else {
      this.isCrdLengthCorrect = 'false';
    }

    if (!(
      (this.accountNumber === '') && (this.identification === '')
      && (!(this.dateFrom !== '' && this.dateTo !== ''))
      && (!(this.amountFrom !== '' && this.amountTo !== ''))
      && this.state === '')
    ) {
      this.validArgs = true;
    } else {
      this.validArgs = false;
    }
  }


getStateBill(){
  this.publicServiceService.getStateBill().subscribe(data => {this.stateList = data});
}

getPayMethod(){
  this.publicServiceService.getPayMethod().subscribe(data => {this.payMethodList = data});
  }

 
getSaleCondition(){
  this.publicServiceService.getSaleCondition().subscribe(data => {this.saleConditionList = data});
    }
  
getCartera(){
  this.publicServiceService.getCartera().subscribe(data => {this.carteraList = data});
   }

getDocType(){
    this.publicServiceService.getDocType().subscribe(data => {this.docTypeList = data});
  }

getBillsFilter(){
  if (this.accountNumber === '') {
    this.accountNumber = null;
  }
  this.publicServiceService.getBillFilter(this.accountNumber)
    .subscribe(data => {
      this.isLoadingResults = false;
      this.receiptsList = <DataPubServ>data;
      if (this.receiptsList.isEmpty === true) {
        this.openSnackBar('No se encontraron datos', 'Revisa los filtros insertados');
      } else {
        this.tableData = this.receiptsList.result;
        this.dataSource = new MatTableDataSource<PublicServiceReceipts>(this.tableData);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    } );
}

  getPublicServices() {
    (this.publicServiceService.getPublicServicesList())
      .subscribe(data => {
        this.publicServicesList = <PublicServicesList[]>data;
      });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.publicServicesList = [];
    this.getPublicServices();
    this.getStateBill();
    this.getPayMethod();
    this.getSaleCondition();
    this.getCartera();
    this.getDocType();

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  searchByArgs() {
    if (this.validArgs) {
      this.getPublicServiceReceiptsByParams();
    }
  }
  openReceiptDetailModal(publicServiceReceiptId: number): void {
    this.publicServiceService.getReceiptDetail(publicServiceReceiptId).subscribe(
      data => {
        this.receiptDetail = data;
        const dialogRef = this.dialog.open(PublicServiceReceiptDetailModalComponent, {
          width: '500px',
          data: {'data' : this.receiptDetail }
        });
      });

  }


  getPublicServiceReceiptsByParams() {
    if (!!this.state) {
      this.publicService = this.state.id;
    } else {
      this.publicService = null;
    }
    this.isLoadingResults = true;
    if (this.accountNumber === '') {
      this.accountNumber = null;
    }
    if (this.cardNumber === '') {
      this.cardNumber = null;
    }
    if (this.dateFrom === '') {
      this.dateFrom = null;
    }
    if (this.dateTo === '') {
      this.dateTo = null;
    }
    if (this.amountFrom === '') {
      this.amountFrom = null;
    }
    if (this.amountTo === '') {
      this.amountTo = null;
    }
    if (this.publicService === '') {
      this.publicService = null;
    }
    this.publicServiceService.getPublicServiceReceiptsByParams(this.accountNumber, this.cardNumber, this.dateFrom,
      this.dateTo, this.amountFrom, this.amountTo, this.publicService)
      .subscribe(data => {
        this.isLoadingResults = false;
        this.receiptsList = <DataPubServ>data;
        if (this.receiptsList.isEmpty === true) {
          this.openSnackBar('No se encontraron datos', 'Revisa los filtros insertados');
        } else {
          this.tableData = this.receiptsList.result;
          this.dataSource = new MatTableDataSource<PublicServiceReceipts>(this.tableData);
          this.changeDetectorRefs.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

      }
      );
  }

}

export interface DataPubServ {
  result: any;
  isEmpty: boolean;
}
export interface PublicServicesList {
  publicServiceList: any;
}

export interface PublicService {
  id: number;
}

export interface PublicServiceReceipts {
  publicServiceReceiptId: number;
  accountNumber: string;
  cardNumber: string;
  publicService: string;
  currency: string;
  amount: string;
  date: string;
  invoiceNumber: string;
  transactionNumber: string;
  voucher: string;
  channel: string;
}


