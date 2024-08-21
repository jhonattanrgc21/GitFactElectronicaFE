import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { ReceiversService } from '../services/receivers.service';
import { DataReceivers, Receiver } from './interfaces/data-receivers.interface';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ConfirmEditionPopupComponent } from './components/confirm-edition-popup/confirm-edition-popup.component';

@Component({
  selector: 'app-receivers-list',
  templateUrl: './receivers-list.component.html',
  styleUrls: ['./receivers-list.component.css']
})
export class ReceiversListComponent implements OnInit, AfterViewChecked {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public myForm: FormGroup;
  public submitted = false;
  receiversList: any;
  public isLoadingResults = false;
  tableData: any;
  billReports = new FormControl();

  displayedColumns: string[] = [
    "identificationTypeDescription",
    "identification",
    "name",
    "phoneNumber",
    "email",
    "accountNumber",
    "establishmentNumber",
    "actions"
  ];

  dataSource = new MatTableDataSource<Receiver>();
  constructor(
    private receiversService: ReceiversService,
		private dialog: MatDialog,
		private viewportRuler: ViewportRuler,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private router: Router
  ) {
    this.myForm = this._fb.group({
      identification: ["", Validators.minLength(9)],
      accountNumber: [
        "",
        [Validators.minLength(7), Validators.maxLength(10)],
      ],
      establishmentNumber: [
        "",
        [Validators.minLength(15), Validators.maxLength(15)],
      ],
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

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public get f() {
    return this.myForm.controls;
  }

  isFilterNotExists(): boolean {
    let { identification, accountNumber, establishmentNumber } = this.myForm.value;

    if (!identification) this.myForm.get('identification').setValue("");
    if (!accountNumber) this.myForm.get('accountNumber').setValue("");
    if (!establishmentNumber) this.myForm.get('establishmentNumber').setValue("");

    return [identification, accountNumber, establishmentNumber].every(value => !value || !value.trim());
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
    this.dataSource = new MatTableDataSource<Receiver>([]);
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.myForm.reset();
  }

  public getBillsFilter(): void {
    this.isLoadingResults = true;
    this.receiversService
      .getReceiversFilter(
        this.f.accountNumber.value,
        this.f.identification.value,
        this.f.establishmentNumber.value,
      )
      .subscribe((data) => {
        this.isLoadingResults = false;
        this.receiversList = <DataReceivers>data;
        if (this.receiversList.isEmpty === true || data.toString() === "") {
          this.openSnackBar(
            "No se encontraron datos",
            "Revisa los filtros insertados"
          );
        }
        this.tableData = this.receiversList;
        this.dataSource = new MatTableDataSource<Receiver>(
          this.tableData
        );
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  onEditReceiver(id: number){
		const viewportSize = this.viewportRuler.getViewportSize();
		const dialogRef = this.dialog.open(ConfirmEditionPopupComponent, {
			width: viewportSize.width < 768 ? '380px' : '474px',
			height: 'auto',
			autoFocus: false,
		});

		dialogRef.afterClosed().subscribe((result: any) => {
			if (result)   this.router.navigate(['/receptor-form', id]);
		});
  }

}
