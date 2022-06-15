import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/observable/of';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReprocessBillSService } from '../services/reprocess-bills-service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-reprocessbills', 
  templateUrl: './reprocess-bills.component.html',
  styleUrls: ['./reprocess-bills.component.css']
})
export class ReprocessBillSComponent implements OnInit {
  reprocessBillSService: any;
  reprocessBillS = new FormControl();
  public myForm: FormGroup;
  submitted = false;
  currentDate=formatDate(new Date(), 'yyyy-MM-dd', 'en');
  updateButton=true;
  date: any;


  constructor(private reprocessBillService: ReprocessBillSService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, public snackBar: MatSnackBar,
    private _fb: FormBuilder) {
  }

 
  tableData: any;
  displayedColumns: string[] = ['billDate'];


openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  checkArgs() {
  }

  public searchByArgs(): void {
    this.getElectronicBillsByParams();
  }

  public getElectronicBillsByParams(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.myForm.invalid  || this.f.billDate.value == "") {
      this.updateButton=true;
      this.openSnackBar(
        "Tiene que escribir una fecha:",
        "En el espacio indicado"
      );
      this.ngOnInit();
        return;
    }
    this.updateBill();
  }

  updateBill(){
    this.updateButton=false;
    this.date=[formatDate(this.f.billDate.value, 'yyyy-MM-dd', 'en')];
  
    this.reprocessBillService.updateBillS(this.date) 
    this.updateButton=true;
    this.openSnackBar(
      "Se enviaron a procesar todas las facturas de:",
      this.date
    );
    this.ngOnInit();
  }


  ngOnInit() {
    this.myForm = this._fb.group({
      dateFrom: [""],
      billDate: [""]
    });
  }
  get f() { return this.myForm.controls; }
  get it() { return this.myForm.controls.items; }

  onUpdate() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.myForm.invalid  || this.f.billDate.value == "") {
          this.updateButton=true;
          this.openSnackBar(
            "Tiene que escribir una fecha:",
            "En el espacio indicado"
          );
          this.ngOnInit();
            return;
        }
        this.updateBill();
    }

//End
}

export interface DialogData {
  message: any;
}


