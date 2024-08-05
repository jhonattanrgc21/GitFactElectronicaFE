import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { BillReportsReceipts } from './interfaces/billReportsReceipts.interface';
import { DataBillReports } from './interfaces/billReports.interface';
import { BillReportsService } from './../services/bill-reports.service';

@Component({
  selector: 'app-bill-reports',
  templateUrl: './bill-reports.component.html',
  styleUrls: ['./bill-reports.component.css']
})
export class BillReportsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public myForm: FormGroup;
  public submitted = false;
  receiptsList: any;
  public isLoadingResults = false;
  tableData: any;
  billReports = new FormControl();

  displayedColumns: string[] = [
    "consecutiveNumber",
    "billDate",
    "identification",
    "name",
    "description",
    "currency",
    "finalSalePrice",
    "TaxTotal",
    "finalTotalPrice",
    "stateBill",
  ];

  dataSource = new MatTableDataSource<BillReportsReceipts>();
  constructor(
    private billReportsService: BillReportsService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private router: Router
  ) {}

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let sanitizedValue = input.value.replace(/[^\d]/g, '');

    // Remove leading zeros
    if (sanitizedValue.charAt(0) === '0') {
      sanitizedValue = sanitizedValue.slice(1);
    }

    // Update the input value
    input.value = sanitizedValue;

    // Update the form control value
    const control = this.myForm.get(input.getAttribute('formControlName'));
    if (control) {
      control.setValue(sanitizedValue, { emitEvent: false });
      control.updateValueAndValidity();
    }
  }


  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.myForm = this._fb.group({
      identification: ["", [Validators.minLength(9),]],
      consecutiveNumber: [
        "",
        [Validators.minLength(20), Validators.maxLength(20), ],
      ],
      dateFrom: [""],
      dateTo: [""],
    });
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public get f() {
    return this.myForm.controls;
  }

  isFilterNotExists(): boolean {
    const { identification, consecutiveNumber, dateFrom, dateTo } = this.myForm.value;
    return [identification, consecutiveNumber, dateFrom, dateTo].every(value => !value || !value.trim());
  }

  isDateRangeInvalid(): boolean {
    const { dateFrom, dateTo } = this.myForm.value;

    if (dateFrom && dateTo) {
      const dateFromTime = new Date(dateFrom).getTime();
      const dateToTime = new Date(dateTo).getTime();
      return dateFromTime >= dateToTime;
    }

    // Si uno de los campos no existe, consideramos que el rango de fechas es válido
    return false;
  }


  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    this.getBillsFilter();
  }

  public getBillsFilter(): void {
    this.isLoadingResults = true;
    this.billReportsService
      .getBillFilter(
        this.f.consecutiveNumber.value,
        this.f.identification.value,
        this.f.dateFrom.value,
        this.f.dateTo.value,
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.receiptsList = <DataBillReports>data;
        if (this.receiptsList.isEmpty === true || data.toString() === "") {
          this.openSnackBar(
            "No se encontraron datos",
            "Revisa los filtros insertados"
          );
        }
        this.tableData = this.receiptsList;
        this.dataSource = new MatTableDataSource<BillReportsReceipts>(
          this.tableData
        );
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
