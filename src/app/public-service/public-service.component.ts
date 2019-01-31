import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl,FormGroup,FormBuilder,Validators } from '@angular/forms';
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
  public myForm: FormGroup;
  submitted = false;


  
  publicServiceReceiptRows: Object = {};
  validArgs = false;
  isActLengthCorrect = 'true';
  isCrdLengthCorrect = 'true';
  isLoadingResults = false;
  

  

  state: String;
  paymethod: String;
  salecondition: String;
  cartera: String;
  doctype: String;

  receiptDetail: PublicServiceReceipts;



  docTypeList: any; 
  carteraList: any; 
  stateList: any; 
  payMethodList: any; 
  saleConditionList: any;
  receiptsList: any;
  result: BillSent;


  constructor(private publicServiceService: PublicServiceServiceService, private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar, dialogService:PublicServiceServiceService,private _fb: FormBuilder) {
  }

  tableData: any;

  publicServices = new FormControl();
  publicServicesList: PublicServicesList[];

  displayedColumns: string[] = ['consecutiveNumber', 'billDate', 'identification', 'name',
    'email','moneda', 'montoFinal', 'tipoPago','estado', 'reenvio', 'pdf'];


    

  dataSource = new MatTableDataSource<PublicServiceReceipts>();

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkArgs() {
    console.log("entre checkArgs");
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
    this.validArgs = true;
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
  this.publicServiceService.getBillFilter( this.f.accountNumber.value, this.f.identification.value, this.f.dateFrom.value,
    this.f.dateTo.value,this.f.amountFrom.value,this.f.amountTo.value, this.f.selectedState.value,this.f.selectedPaymethod.value,this.f.salecondition.value,
    this.f.selectedCartera.value,this.f.selectedDoctype.value)
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

get f() { return this.myForm.controls; }

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
    this.myForm = this._fb.group({
      accountNumber:['',[Validators.minLength(7),Validators.pattern("^[0-9]*$")]],
      identification:['',[Validators.minLength(9)]],
      dateFrom:[''],
      dateTo:[''],
      amountFrom:[''],
      amountTo:[''],
      state:[''],
      paymethod:[''],
      salecondition:[''],
      doctype:[''],
      selectedState:[''],
      selectedPaymethod:[''],
      selectedSalecondition:[''],
      selectedCartera:[''],
      selectedDoctype:['']
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  searchByArgs() {
    this.getElectronicBillsByParams();
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

  onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.myForm.invalid) {
            return;
        }
        this.getBillsFilter();
    }


  getElectronicBillsByParams() {
    this.isLoadingResults = true;


    this.publicServiceService.getPublicServiceReceiptsByParams(this.f.accountNumber.value, this.f.identification.value, this.f.dateFrom.value,
    this.f.dateTo.value,this.f.amountFrom.value,this.f.amountTo.value, this.f.selectedState.value,this.f.selectedPaymethod.value,this.f.salecondition.value,
    this.f.selectedCartera.value,this.f.selectedDoctype.value)
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
  email:string;
}

