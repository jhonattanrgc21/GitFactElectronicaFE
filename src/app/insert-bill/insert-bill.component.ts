import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray,Validators } from '@angular/forms';
import { Input, OnChanges,Inject } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InsertBillService } from '../services/insert-bill-service';
import {formatDate} from '@angular/common';
import {Router} from "@angular/router"
// tslint:disable-next-line:max-line-length
//import { PublicServiceReceiptDetailModalComponent } from './modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component';

@Component({
  selector: 'app-insertbill', //selector: 'app-public-service',
  templateUrl: './insert-bill.component.html',
  styleUrls: ['./insert-bill.component.css']
})
export class InsertBillComponent implements OnInit {
  InsertBillService: any;
  insertBills = new FormControl();
  public myForm: FormGroup;
  submitted = false;
  currentDate=formatDate(new Date(), 'dd-MM-yyyy', 'en');
  referenceDocument: String;
  currency: String;
  insertButton=true;

  referenceDocumentList: any;
  currencyList: any;
  insertResponse: any;
  measureList: any;




  constructor(private insertBillService: InsertBillService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar,
    private _fb: FormBuilder) {
    this.referenceDocument = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InsertBillAlertDialog, {
      width: '500px',
      data: {message: this.insertResponse}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  tableData: any;



  displayedColumns: string[] = ['consecutiveNumber', 'billDate', 'identification', 'name',
    'moneda', 'montoFinal', 'tipoPago', 'estado', 'acciones'];




  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkArgs() {
  }

  getReferenceDocument() {
    this.insertBillService.getReferenceDocument().subscribe(data => { this.referenceDocumentList = data });
  }

  getCurrency() {
    this.insertBillService.getCurrency().subscribe(data => { this.currencyList = data });
  }
  getMeasureList(){
    this.insertBillService.getMeasureList().subscribe(data => { this.measureList = data });
    
  }

  insertBill(){
    this.insertButton=false;

    this.insertBillService.insertyBill(this.f.selectedCurrency.value,this.f.identification.value,this.f.establishment.value,
    this.f.selectedReferenceDocument.value,this.f.billDate.value,this.f.items.value)
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
    this.myForm = this._fb.group({
      identification: ['', Validators.required],
      billDate:[formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required],
      establishment:['',[Validators.minLength(15),Validators.pattern("^[0-9]*$"),Validators.maxLength(15)]],
      selectedReferenceDocument: ['', Validators.required],
      selectedCurrency: ['', Validators.required],

      items: this._fb.array([
        this.initDetails()
      ], Validators.required)
    });
    this.referenceDocumentList = '';
    this.currencyList = '';
    this.getReferenceDocument();
    this.getCurrency();
    this.getMeasureList();
  }

  initDetails() {
    return this._fb.group({
      quantity: ['', Validators.required],
      detailDescription: ['', Validators.required],
      unitPrice: ['', Validators.required],
      measure:['',Validators.required],
      taxed: [false]
    });
  }

  addDetail() {
    const control = <FormArray>this.myForm.controls['items'];
    control.push(this.initDetails());
  }

  removeDetail(i: number) {
    const control = <FormArray>this.myForm.controls['items'];
    control.removeAt(i);
  }
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
  selector: 'insert-bill-alert-dialog',
  templateUrl: 'insert-bill-alert-dialog.html',
})
export class InsertBillAlertDialog {

  constructor(
    public dialogRef: MatDialogRef<InsertBillAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private router: Router) {}

  okClick(message): void {
    if(message=='error'){
      this.dialogRef.close();
    }else{
      location.reload();
      this.dialogRef.close();
    }
    
  }

}

export interface DialogData {
  message: any;
}




