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
  
  @Input() selectedState: any;
  @Input() selectedPaymethod: any;
  @Input() selectedSalecondition: any;
  @Input() selectedCartera: any;
  @Input() selectedDoctype: any;
  

  state: String;
  paymethod: String;
  salecondition: String;
  cartera: String;
  doctype: String;

  receiptDetail: PublicServiceReceipts;

  @Input() identification : String;
  @Input() accountNumber = '';
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
  receiptsList: any;
  result: BillSent;


  constructor(private publicServiceService: PublicServiceServiceService, private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar, dialogService:PublicServiceServiceService) {
    this.accountNumber = '';
    this.identification = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.amountFrom = '';
    this.amountTo = '';
    this.state = '';
    this.paymethod = '';
    this.salecondition = '';
    this.doctype = '';
    this.selectedState= '';
    this.selectedPaymethod= '';
    this.selectedSalecondition= '';
    this.selectedCartera= '';
    this.selectedDoctype= '';
  }

  tableData: any;

  publicServices = new FormControl();
  publicServicesList: PublicServicesList[];

  displayedColumns: string[] = ['consecutiveNumber', 'billDate', 'identification', 'name',
    'moneda', 'montoFinal', 'tipoPago','estado', 'reenvio', 'pdf'];


    

  dataSource = new MatTableDataSource<PublicServiceReceipts>();

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkArgs() {
    console.log("entre checkArgs");
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

    if (!(
      (this.accountNumber === '') && (this.identification === '')
      && (!(this.dateFrom !== '' && this.dateTo !== ''))
      && (!(this.amountFrom !== '' && this.amountTo !== ''))
      && !!!this.selectedState[0] && !!!this.selectedDoctype[0] && !!!this.selectedCartera && !!!this.selectedPaymethod[0] && !!!this.selectedSalecondition[0]
    )
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

sendBillPDF(consecutiveNumber){
  this.publicServiceService.sendBillPDF(consecutiveNumber).subscribe(data => 
    {
     this.result = <BillSent>data;
      if(this.result.sent){
        this.openSnackBar('Ocurrio un error al enviar el correo','');
     } else{
      this.openSnackBar('Correo enviado correctamente','');
     } 
  });
}


getBillsFilter(){
  if (this.accountNumber === '') {
    this.accountNumber = null;
  }
  if (this.identification === '') {
    this.identification = null;
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
  if (this.state === '') {
    this.state = null;
  }
  if (this.paymethod === '') {
    this.paymethod = null;
  }
  if (this.salecondition === '') {
    this.salecondition = null;
  }
  if (this.cartera === '') {
    this.cartera = null;
  }
  if (this.doctype === '') {
    this.doctype = null;
  }
  this.publicServiceService.getBillFilter( this.accountNumber, this.identification, this.dateFrom,
    this.dateTo, this.amountFrom, this.amountTo, this.state,this.paymethod,this.salecondition,this.cartera,this.doctype)
    .subscribe(data => {
      this.isLoadingResults = false;
      this.receiptsList = <DataPubServ>data;
      if (this.receiptsList.isEmpty === true) {
        this.openSnackBar('No se encontraron datos', 'Revisa los filtros insertados');
      } else {
        this.tableData = this.receiptsList;
        this.dataSource = new MatTableDataSource<PublicServiceReceipts>(this.tableData);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    } );
}


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.payMethodList= '';
    this.stateList = '';
    this.saleConditionList = '';
    this.carteraList = '';
    this.docTypeList = '';
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
      this.getElectronicBillsByParams();
    }
  }
  openReceiptDetailModal(publicServiceReceiptId: number): void {
    this.publicServiceService.getReceiptDetail(publicServiceReceiptId).subscribe(
      data => {
        this.receiptDetail = <PublicServiceReceipts> data;
        const dialogRef = this.dialog.open(PublicServiceReceiptDetailModalComponent, {
          width: '500px',
          data: {'data' : this.receiptDetail }
        });
      });

  }


  getElectronicBillsByParams() {
    this.isLoadingResults = true;


    if (this.accountNumber === '') {
      this.accountNumber = null;
    }else{
      this.accountNumber = this.accountNumber;
    }

    if (this.identification === '') {
      this.identification = null;
    }else{
      this.identification = this.identification;
    }

    if (this.dateFrom === '') {
      this.dateFrom = null;
    }else{
      this.dateFrom = this.dateFrom;
    }

    if (this.dateTo === '') {
      this.dateTo = null;
    }else{
      this.dateTo = this.dateTo;
    }
    
    if (this.amountFrom === '') {
      this.amountFrom = null;
    }else{
      this.amountFrom = this.amountFrom;
    }

    if (this.amountTo === '') {
      this.amountTo = null;
    }else{
      this.amountTo = this.amountTo;
    }

    if (this.selectedState[0] === '') {
      this.selectedState = null;
    } else{
      this.state = this.selectedState[0];
    }

    if (this.selectedPaymethod[0] === '') {
      this.selectedPaymethod = null;
    }
    else{
      this.paymethod = this.selectedPaymethod[0];
    }

    if (this.selectedSalecondition[0] === '') {
      this.selectedSalecondition = null;
    }else{
      this.salecondition = this.selectedPaymethod[0];
    }

    if (this.selectedCartera === '') {
      this.selectedCartera = null;
    }else{
      this.cartera = this.selectedCartera;
    }

    if (this.selectedDoctype[0] === '') {
      this.selectedDoctype = null;
    }else{
      this.doctype = this.selectedDoctype[0];
    }



    this.publicServiceService.getPublicServiceReceiptsByParams(this.accountNumber, this.identification, this.dateFrom,
      this.dateTo, this.amountFrom, this.amountTo, this.state,this.paymethod,this.salecondition,this.cartera,this.doctype)
      .subscribe(data => {
        this.isLoadingResults = false;
        this.receiptsList = data;
        if (this.receiptsList.isEmpty === true) {
          this.openSnackBar('No se encontraron datos', 'Revisa los filtros insertados');
        } else {
          this.tableData = this.receiptsList;
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

export interface BillSent {
  sent: boolean;
}

export interface PublicServiceReceipts {
  consecutiveNumber: string;
  passwordGenerated: string;
  billDate: string;
  identification: string;
  name: string;
  moneda: string;
  montoFinal: string;
  tipoPago: string;
  estado: string;
  detalle: string;
}

