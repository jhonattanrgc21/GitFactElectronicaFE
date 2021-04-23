import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import "rxjs/add/observable/of";
import { MatSnackBar, MatDialog } from "@angular/material";
import { InsertBillService } from "../services/insert-bill-service";
import { formatDate } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { MatTableDataSource } from "@angular/material";
import { displayedColumns } from "./constants/credit-note-constants";
import { DetailLine } from "./interfaces/detail-line-credi-note-interface";
import {
  getControlErrors,
  getFormControl,
  isControlInvalid,
} from "../shared/helpers/forms/forms.helper";
import { CreditNoteAlertDialog } from "./credit-note-alert-dialog";
import { ADD_DETAIL_FORM_ERRORS } from "./constants/add-detail-form-errors";
@Component({
  selector: "app-creditnote", //selector: 'app-public-service',
  templateUrl: "./credit-note.component.html",
  styleUrls: ["./credit-note.component.css"],
})
export class CreditNoteComponent implements OnInit {
  consecutive: String;
  documentTypeDescription: String;
  emissionDocumentDate: String;
  currencyDescription: String;
  receiverIdentification: String;
  receiverName: String;
  InsertBillService: any;
  insertBills = new FormControl();
  public myForm: FormGroup;
  public myFormArray: FormArray;
  submitted = false;
  currentDate = formatDate(new Date(), "dd-MM-yyyy", "en");
  referenceDocument: String;
  currency: String;
  insertButton = true;
  billData: any;
  establishment: any;
  dataSource = null;
  referenceDocumentList: any;
  currencyList: any;
  insertResponse: any;
  detailsArray: any;
  referenceCodeList: any;
  detailsRows: Object = {};
  tableData: any;
  public displayedColumns: string[];
  public rowEditable: number;
  public measureList: any;
  public serviceCodeList: any;
  public isAddDetailCreditNote: boolean;
  public addDetailForm: FormGroup;
  public addDetailFormErrors: any;
  public editRow: FormGroup;

  public isControlInvalid: (
    abstractControl: AbstractControl
  ) => boolean = isControlInvalid;

  public getControlErrors: (
    controlName: string,
    formgroup: FormGroup,
    errors: any
  ) => string = getControlErrors;

  public getFormControl: (
    abstractControl: AbstractControl
  ) => FormControl = getFormControl;

  constructor(
    private insertBillService: InsertBillService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.referenceDocument = "";
    this.rowEditable = -1;
    this.displayedColumns = displayedColumns;
    this.addDetailFormErrors = ADD_DETAIL_FORM_ERRORS;
    this.isAddDetailCreditNote = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.consecutive = params["id"];
    });
    this.myForm = this._fb.group({
      selectedReferenceCode: ["", Validators.required],
    });
    this.referenceDocumentList = "";
    this.currencyList = "";
    this.referenceCodeList = "";
    this.getRefCode();
    this.getBillData(this.consecutive);
    this.getMeasureList();
    this.getAllServiceCode();
    this.addDetailForm = this.initDetails();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreditNoteAlertDialog, {
      width: "500px",
      data: { message: this.insertResponse },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public createFormArray(): void {
    this.myFormArray = this._fb.array([]);
    this.detailsArray.map((details) => {
      this.myFormArray.push(
        this._fb.group({
          detailDescription: [details.detailDescription, Validators.required],
          measure: [details.measure, Validators.required],
          quantity: [details.quantity, Validators.required],
          serviceCode: [details.serviceCode, Validators.required],
          taxed: [details.taxed],
          unitPrice: [details.unitPrice, Validators.required],
        })
      );
    });
  }

  public getRefCode(): void {
    this.insertBillService.getReferenceCode().subscribe((data) => {
      this.referenceCodeList = data;
    });
  }

  public getBillData(consecutiveNumber): void {
    this.insertBillService
      .getCreditNoteData(consecutiveNumber)
      .subscribe((data) => {
        this.billData = data;
        this.receiverIdentification = this.billData.rcvIdentification;
        this.documentTypeDescription = this.billData.documentTypeDescription;
        this.emissionDocumentDate = this.billData.bill_date;
        this.currencyDescription = this.billData.currencyDescription;
        this.receiverName = this.billData.receiverName;
        this.detailsArray = this.billData.dtlsarray;
        this.dataSource = new MatTableDataSource<DetailLine>(this.detailsArray);
        this.createFormArray();
        this.currency = this.billData.crcId;
        this.establishment = this.billData.esbId;
      });
  }

  public insertBill(): void {
    this.insertButton = false;
    this.insertBillService
      .insertCreditNote(
        this.currency,
        this.receiverIdentification,
        this.establishment,
        3,
        this.emissionDocumentDate,
        this.detailsArray,
        this.f.selectedReferenceCode.value,
        this.consecutive
      )
      .subscribe((data) => {
        this.insertResponse = data;
        this.openDialog();
        if (this.insertResponse.type == "error") {
          this.insertButton = true;
        }
      });
  }

  public get f() {
    return this.myForm.controls;
  }

  public get it() {
    return this.myForm.controls.items;
  }

  public onSubmit() {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    this.insertBill();
  }

  public removeDetailCreditNote(position: number): void {
    this.detailsArray.splice(position, 1);
    this.myFormArray.removeAt(position);
    this.dataSource = new MatTableDataSource<DetailLine>(this.detailsArray);
  }

  public addDetailCreditNote(): void {
    this.addDetailForm = this.initDetails();
    this.isAddDetailCreditNote = true;
    this.insertButton = false;
  }

  public aceptAddDetailCreditNote(): void {
    if (this.addDetailForm.valid) {
      this.isAddDetailCreditNote = false;
      this.detailsArray.push(this.addDetailForm.value);
      this.myFormArray.push(this.addDetailForm);
      this.dataSource = new MatTableDataSource<DetailLine>(this.detailsArray);
      this.insertButton = true;
    }
  }

  public cancelAddDetailCreditNote(): void {
    this.isAddDetailCreditNote = false;
    this.insertButton = true;
  }

  public getMeasureList(): void {
    this.insertBillService.getMeasureList().subscribe((data) => {
      this.measureList = data;
    });
  }

  public isRowModeEdit(index: number): boolean {
    return index === this.rowEditable;
  }

  public toggleRowEditable(index: number): void {
    if (this.rowEditable === -1 || !this.isRowModeEdit(index)) {
      this.rowEditable = index;
      const aux = this.myFormArray.at(index).value;
      this.editRow = aux;
    } else {
      this.rowEditable = -1;
    }
  }

  public getAllServiceCode(): void {
    this.insertBillService.getServiceCodeList().subscribe((data) => {
      this.serviceCodeList = data;
    });
  }

  public initDetails(): FormGroup {
    return this._fb.group({
      detailDescription: ["", Validators.required],
      measure: ["", Validators.required],
      quantity: [
        "",
        Validators.compose([Validators.required, Validators.min(1)]),
      ],
      serviceCode: ["", Validators.required],
      taxed: [false, Validators.required], 
      unitPrice: [
        "",
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
  }

  public getServiceSCOName(servicecode: number): string {
    return servicecode
      ? this.serviceCodeList.find((element) => element.sco_Id === servicecode)
          .SCO_Name
      : "";
  }

  public getMeasureName(measure: number): string {
    return measure
      ? this.measureList.find((element) => element[0] === measure)[1]
      : "";
  }

  public getCurrencyCode(): string {
    return this.currencyDescription.toLowerCase() === "colones" ? "CRC" : "USD";
  }

  public getValueTaxed(taxed: boolean): string {
    return taxed ? "Aplica" : "No aplica";
  }

  public getRowFormControl(index: number, controlName: string): FormControl {
    return this.myFormArray.at(index).get(controlName) as FormControl;
  }

  public cancelEditDetailCreditNote(index: number): void {
    this.myFormArray.at(index).setValue(this.editRow);
    this.toggleRowEditable(index);
  }

  public aceptEditDetailCreditNote(index: number): void {
    this.detailsArray[index].detailDescription = this.getRowFormControl(
      index,
      "detailDescription"
    ).value;
    this.detailsArray[index].measure = this.getRowFormControl(
      index,
      "measure"
    ).value;
    this.detailsArray[index].quantity = this.getRowFormControl(
      index,
      "quantity"
    ).value;
    this.detailsArray[index].serviceCode = this.getRowFormControl(
      index,
      "serviceCode"
    ).value;
    this.detailsArray[index].taxed = this.getRowFormControl(
      index,
      "taxed"
    ).value;
    this.detailsArray[index].unitPrice = this.getRowFormControl(
      index,
      "unitPrice"
    ).value;
    this.toggleRowEditable(index);
    console.log(this.detailsArray);
  }
}
