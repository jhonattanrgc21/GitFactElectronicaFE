import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  OnDestroy,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { PublicServiceServiceService } from "../services/public-service-service.service";
import "rxjs/add/observable/of";
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Router } from "@angular/router";

import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from "rxjs";

@Component({
  selector: "app-public-service",
  templateUrl: "./public-service.component.html",
  styleUrls: ["./public-service.component.css"],
})
export class PublicServiceComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public myForm: FormGroup;
  public submitted = false;
  public subscriptions: Subscription;
  public showModalResendEmail: boolean;
  public publicServiceReceiptRows: Object = {};
  public validArgs = false;
  public isActLengthCorrect = "true";
  public isCrdLengthCorrect = "true";
  public isLoadingResults = false;
  public selectedReceipt: PublicServiceReceipts;
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
  pdfResponse: any;

  tableData: any;

  publicServices = new FormControl();
  publicServicesList: PublicServicesList[];

  displayedColumns: string[] = [
    "consecutiveNumber",
    "billDate",
    "identification",
    "name",
    "email",
    "moneda",
    "montoFinal",
    "tipoPago",
    "estado",
    "acciones",
  ];

  dataSource = new MatTableDataSource<PublicServiceReceipts>();

  constructor(
    private publicServiceService: PublicServiceServiceService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private router: Router
  ) {
    this.subscriptions = new Subscription();
    this.showModalResendEmail = false;
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.payMethodList = "";
    this.stateList = "";
    this.saleConditionList = "";
    this.carteraList = "";
    this.docTypeList = "";
    this.getStateBill();
    this.getPayMethod();
    this.getSaleCondition();
    this.getCartera();
    this.getDocType();
    this.myForm = this._fb.group({
      accountNumber: [
        "",
        [Validators.minLength(7), Validators.pattern("^[0-9]*$")],
      ],
      identification: ["", [Validators.minLength(9)]],
      consecutiveNumber: [
        "",
        [Validators.minLength(20), Validators.maxLength(20)],
      ],
      dateFrom: [""],
      dateTo: [""],
      amountFrom: [""],
      amountTo: [""],
      state: [""],
      paymethod: [""],
      salecondition: [""],
      doctype: [""],
      selectedState: [""],
      selectedPaymethod: [""],
      selectedSalecondition: [""],
      selectedCartera: [""],
      selectedDoctype: [""],
    });
    this.subscriptions.add(this.handleResedEmailErrorSubscription());
    this.subscriptions.add(this.handleResendEmailSuccessSubscription());
  }

  public handleResedEmailErrorSubscription(): Subscription {
    return this.publicServiceService.resendEmailError$.subscribe(
      (error: boolean) => {
        if (error) {
          this.openSnackBar("Ocurrio un error al enviar el correo", "");
        }
      }
    );
  }

  public handleResendEmailSuccessSubscription(): Subscription {
    return this.publicServiceService.resendEmailSuccess$.subscribe(
      (success: boolean) => {
        if (success) {
          this.openSnackBar("Correo enviado correctamente", "");
        }
      }
    );
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(PDFBillDialog, {
      width: "80%",
      data: {
        pdf: this.sanitizer.bypassSecurityTrustResourceUrl(
          "data:application/pdf;base64," + this.pdfResponse.pdfData
        ),
      },
      height: "80%",
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public checkArgs(): void {
    console.log("entre checkArgs");
    if (this.state == null) {
      this.state = "";
    }
    if (this.paymethod == null) {
      this.paymethod = "";
    }
    if (this.salecondition == null) {
      this.salecondition = "";
    }
    if (this.cartera == null) {
      this.cartera = "";
    }
    if (this.doctype == null) {
      this.doctype = "";
    }
    this.validArgs = true;
  }

  public getStateBill(): void {
    this.publicServiceService.getStateBill().subscribe((data) => {
      this.stateList = data;
    });
  }

  public getPayMethod(): void {
    this.publicServiceService.getPayMethod().subscribe((data) => {
      this.payMethodList = data;
    });
  }

  public getSaleCondition(): void {
    this.publicServiceService.getSaleCondition().subscribe((data) => {
      this.saleConditionList = data;
    });
  }

  public getCartera(): void {
    this.publicServiceService.getCartera().subscribe((data) => {
      this.carteraList = data;
    });
  }

  public getDocType(): void {
    this.publicServiceService.getDocType().subscribe((data) => {
      this.docTypeList = data;
    });
  }

  public sendBillPDF(publicServiceReceipt: PublicServiceReceipts): void {
    this.selectedReceipt = publicServiceReceipt;
    this.toggleModalResendEmail();
  }

  public toggleModalResendEmail(): void {
    this.showModalResendEmail = !this.showModalResendEmail;
  }

  public getBillsFilter(): void {
    this.isLoadingResults = true;

    if (this.state === "") {
      this.state = null;
    }
    if (this.paymethod === "") {
      this.paymethod = null;
    }
    if (this.salecondition === "") {
      this.salecondition = null;
    }
    if (this.cartera === "") {
      this.cartera = null;
    }
    if (this.doctype === "") {
      this.doctype = null;
    }
    this.publicServiceService
      .getBillFilter(
        this.f.consecutiveNumber.value,
        this.f.accountNumber.value,
        this.f.identification.value,
        this.f.dateFrom.value,
        this.f.dateTo.value,
        this.f.amountFrom.value,
        this.f.amountTo.value,
        this.f.selectedState.value,
        this.f.selectedPaymethod.value,
        this.f.selectedSalecondition.value,
        this.f.selectedCartera.value,
        this.f.selectedDoctype.value
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.receiptsList = <DataPubServ>data;
        if (this.receiptsList.isEmpty === true || data.toString() === "") {
          this.openSnackBar(
            "No se encontraron datos",
            "Revisa los filtros insertados"
          );
        }
        this.tableData = this.receiptsList;

        this.dataSource = new MatTableDataSource<PublicServiceReceipts>(
          this.tableData
        );
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public getPdfBill(consecutiveNumber): void {
    this.publicServiceService.getPDF(consecutiveNumber).subscribe((data) => {
      this.pdfResponse = data;
      if (this.pdfResponse != null && this.pdfResponse.pdfData != null) {
        this.openDialog();
      } else {
        this.openSnackBar("No se encontró el PDF solicitado", "");
      }
    });
  }

  public generateCreditNote(consecutiveNumber): void {
    this.router.navigate(["creditNote", consecutiveNumber]);
  }

  public get f() {
    return this.myForm.controls;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public searchByArgs(): void {
    this.getElectronicBillsByParams();
  }
  public openReceiptDetailModal(publicServiceReceiptId: number): void {
    this.publicServiceService
      .getReceiptDetail(publicServiceReceiptId)
      .subscribe((data) => {
        this.receiptDetail = <PublicServiceReceipts>data;
      });
  }

  public onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.myForm.invalid) {
      return;
    }
    this.getBillsFilter();
  }

  public getElectronicBillsByParams(): void {
    this.isLoadingResults = true;

    this.publicServiceService
      .getPublicServiceReceiptsByParams(
        this.f.consecutiveNumber.value,
        this.f.accountNumber.value,
        this.f.identification.value,
        this.f.dateFrom.value,
        this.f.dateTo.value,
        this.f.amountFrom.value,
        this.f.amountTo.value,
        this.f.selectedState.value,
        this.f.selectedPaymethod.value,
        this.f.selectedSalecondition.value,
        this.f.selectedCartera.value,
        this.f.selectedDoctype.value
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.receiptsList = data;
        if (this.receiptsList.isEmpty === true || data.toString() === "") {
          this.openSnackBar(
            "No se encontraron datos",
            "Revisa los filtros insertados"
          );
        }
        this.tableData = this.receiptsList;
        this.dataSource = new MatTableDataSource<PublicServiceReceipts>(
          this.tableData
        );
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
  email: string;
}

@Component({
  selector: "public-service-pdf-dialog",
  templateUrl: "public-service-pdf-dialog.html",
})
export class PDFBillDialog {
  constructor(
    public dialogRef: MatDialogRef<PDFBillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  okClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  pdf: any;
}
