import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray,Validators } from '@angular/forms';
import { Input, OnChanges,Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InsertBillService } from '../services/insert-bill-service';
import {formatDate} from '@angular/common';
import {Router,ActivatedRoute} from "@angular/router"
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// tslint:disable-next-line:max-line-length
//import { PublicServiceReceiptDetailModalComponent } from './modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component';

@Component({
  selector: 'app-creditnote', //selector: 'app-public-service',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.css']
})
export class CreditNoteComponent implements OnInit {
  consecutive: String;
  documentTypeDescription: String;
  emissionDocumentDate: String
  currencyDescription: String;
  receiverIdentification: String;
  receiverName: String;
  InsertBillService: any;
  insertBills = new FormControl();
  public myForm: FormGroup;
  submitted = false;
  currentDate=formatDate(new Date(), 'dd-MM-yyyy', 'en');
  referenceDocument: String;
  currency: String;
  insertButton=true;
  billData: any;
  establishment: any;

  referenceDocumentList: any;
  currencyList: any;
  insertResponse: any;
  detailsArray: any;
  referenceCodeList: any;
  detailsRows: Object = {};




  constructor(private insertBillService: InsertBillService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar,
    private _fb: FormBuilder,private route: ActivatedRoute) {
    this.referenceDocument = '';
  }

  

  openDialog(): void {
    const dialogRef = this.dialog.open(CreditNoteAlertDialog, {
      width: '500px',
      data: {message: this.insertResponse}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  tableData: any;



  displayedColumns: string[] = ['quantity','detailDescription', 'unitPrice'];




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getRefCode() {
    this.insertBillService.getReferenceCode().subscribe(data => { this.referenceCodeList = data });
  }

  getBillData(consecutiveNumber){
    this.insertBillService.getCreditNoteData(consecutiveNumber).subscribe(data => {
      this.billData=data;
      this.receiverIdentification=this.billData.rcvIdentification;
      this.documentTypeDescription=this.billData.documentTypeDescription;
      this.emissionDocumentDate=this.billData.bill_date;
      this.currencyDescription=this.billData.currencyDescription;
      this.receiverName=this.billData.receiverName;
      this.detailsArray=this.billData.dtlsarray;
      this.dataSource = new MatTableDataSource<DetailLine>(this.detailsArray);
      this.currency= this.billData.crcId;
      this.establishment= this.billData.esbId;
  });
  }

  insertBill(){
    this.insertButton=false;
    this.insertBillService.insertCreditNote(this.currency,this.receiverIdentification,this.establishment,3
    ,this.emissionDocumentDate,this.detailsArray,this.f.selectedReferenceCode.value,this.consecutive)
    .subscribe(data => { 
      this.insertResponse = data;
      this.openDialog();
      if(this.insertResponse.type=="error"){
        this.insertButton=true;
      } 
    }
    ); 
  }







  ngOnInit() {
    this.route.params.subscribe(params => {
      this.consecutive = params['id'];
    });
    this.myForm = this._fb.group({
      selectedReferenceCode: ['', Validators.required]
    });
    this.referenceDocumentList = '';
    this.currencyList = '';
    this.referenceCodeList = '';
    this.getRefCode();
    this.getBillData(this.consecutive);

  }

  dataSource = new MatTableDataSource<DetailLine>();




  get f() { return this.myForm.controls; }
  get it() { return this.myForm.controls.items; }

  onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.myForm.invalid) {
            return;
        }
        this.insertBill();
    }


}


@Component({
  selector: 'credit-note-alert-dialog',
  templateUrl: 'credit-note-alert-dialog.html',
})
export class CreditNoteAlertDialog {

  constructor(
    public dialogRef: MatDialogRef<CreditNoteAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router: Router) {}

  okClick(message): void {
    if(message=='error'){
      this.dialogRef.close();
    }else{
      this.router.navigate(['']);
      this.dialogRef.close();
    }
    
  }

}

export interface DialogData {
  message: any;
}

export interface DetailLine {
  detailDescription: string;
  unitPrice: number;
  quantity: number;
}





