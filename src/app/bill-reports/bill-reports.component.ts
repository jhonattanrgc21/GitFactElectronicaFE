import { Component, OnInit, ViewChild, OnDestroy, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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
export class BillReportsComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public myForm: FormGroup;
  public submitted = false;
  receiptsList: any;
  public isLoadingResults = false;
  tableData: any;
  billReports = new FormControl();
  public isActLengthCorrect = "true";
  public isCrdLengthCorrect = "true";

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
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private cdref: ChangeDetectorRef
  ) {
    this.myForm = this._fb.group({
      identification: ["", [Validators.minLength(9),]],
      consecutiveNumber: [
        "",
        [Validators.minLength(20), Validators.maxLength(20)],
      ],
      dateFrom: ["", this.dateFromValidator],
      dateTo: ["", this.dateToValidator.bind(this)]
    });

    this.myForm.get('dateFrom').valueChanges.subscribe(() => {
      this.myForm.get('dateTo').updateValueAndValidity();
    });
  }

  onNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;

    // Elimina cualquier carácter que no sea un dígito
    let sanitizedValue = input.value.replace(/[^\d]/g, '');

    // Actualiza el valor del input
    input.value = sanitizedValue;

    // Actualiza el valor del control del formulario
    const control = this.myForm.get(input.getAttribute('formControlName'));
    if (control) {
      control.setValue(sanitizedValue, { emitEvent: false });
      control.updateValueAndValidity();
    }
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  dateFromValidator(control: any): { [key: string]: boolean } | null {
    const dateFrom = control.value;
    const today = new Date();

    if (dateFrom && dateFrom !== "" && new Date(dateFrom) > today) {
      return { dateFromGreaterThanToday: true };
    }

    return null; // No hay errores
  }

  dateToValidator(control: any): { [key: string]: boolean } | null {
    if(this.myForm){
      const dateFrom = this.myForm.get('dateFrom').value;
      const dateTo = control.value;
      const today = new Date();

      // Validar 'dateTo' por sí mismo
      if (dateTo && dateTo !== "" && new Date(dateTo) > today) {
        return { dateToGreaterThanToday: true };
      }

      // Validar 'dateTo' en comparación con 'dateFrom'
      if (dateFrom && dateFrom !== "" && dateTo && dateTo !== "") {
        if (new Date(dateTo) < new Date(dateFrom)) {
          return { dateToLessThanFrom: true };
        }
      }
    }

    return null; // No hay errores
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
    let { identification, consecutiveNumber, dateFrom, dateTo } = this.myForm.value;

    if (!identification) this.myForm.get('identification').setValue("");
    if (!consecutiveNumber) this.myForm.get('consecutiveNumber').setValue("");
    if (!dateFrom) this.myForm.get('dateFrom').setValue("");
    if (!dateTo) this.myForm.get('dateTo').setValue("");

    dateFrom = String(dateFrom)
    dateTo = String(dateTo)
    return [identification, consecutiveNumber, dateFrom, dateTo].every(value => !value || !value.trim());
  }

  isDateRangeInvalid(): boolean {
    const { dateFrom, dateTo } = this.myForm.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer hora a 00:00:00 para comparación precisa

    // Convertir fechas a objetos Date si están presentes
    const dateFromTime = dateFrom ? new Date(dateFrom).getTime() : null;
    const dateToTime = dateTo ? new Date(dateTo).getTime() : null;
    const todayTime = today.getTime();

    // Verificar si 'dateFrom' es mayor que la fecha actual
    if (dateFromTime && dateFromTime > todayTime) {
      return true; // Error: dateFrom no puede ser mayor que la fecha actual
    }

    // Verificar si 'dateTo' es mayor que la fecha actual
    if (dateToTime && dateToTime > todayTime) {
      return true; // Error: dateTo no puede ser mayor que la fecha actual
    }

    // Verificar si 'dateTo' es menor que 'dateFrom'
    if (dateFromTime && dateToTime && dateToTime < dateFromTime) {
      return true; // Error: dateTo debe ser mayor o igual a dateFrom
    }

    // Si ninguna de las condiciones de error es verdadera, el rango es válido
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

  public onClean(): void {
    this.dataSource = new MatTableDataSource<BillReportsReceipts>([]);
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.myForm.reset();
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

  export() {
    this.billReportsService.exportBillReports(this.dataSource.data);
  }
}
