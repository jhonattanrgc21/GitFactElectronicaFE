import { AfterViewChecked, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CodopsService } from '../services/codops.service';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Codop, CodopsListResponse } from './interfaces/codops-list.interface';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCode } from './interfaces/service-code.interface';
import { CodopFilter } from './interfaces/codop-filter.interface';

@Component({
  selector: 'app-codops-list',
  templateUrl: './codops-list.component.html',
  styleUrls: ['./codops-list.component.css']
})
export class CodopsListComponent implements OnInit, AfterViewChecked {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  myForm: FormGroup;
  submitted = false;
  isLoadingResults = false;
  codopList: Codop[];
  serviceCodeList: ServiceCode[];

  dataSource = new MatTableDataSource<Codop>();
  displayedColumns: string[] = [
    "code",
    "type",
    "operator",
    "description",
    "iva",
    "isIva",
    "serviceCodeId",
    "isActive"
  ];


  constructor(
    private codopsService: CodopsService,
    private dialog: MatDialog,
    private viewportRuler: ViewportRuler,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.myForm = this._fb.group({
      code: [null, [Validators.minLength(6), Validators.maxLength(6)]],
      serviceCodeId: [null],
    });
  }

  setCodopTable() {
    this.dataSource = new MatTableDataSource<Codop>(
      this.codopList
    );
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.codopList = this.activateRoute.snapshot.data['codopsList'];
    this.serviceCodeList = this.activateRoute.snapshot.data['serviceCodeList'];
    this.setCodopTable();
  }

  ngAfterViewChecked() {
    this.cdref.detectChanges();
  }

  get f() {
    return this.myForm.controls;
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

  onClean(): void {
    this.myForm.reset();
    if(this.submitted )  this.getCodopsListByFilter();
    this.submitted = false;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isFilterNotExists(): boolean {
    let { code, serviceCodeId } = this.myForm.value;

    if (!code) code = "";
    if (!serviceCodeId) serviceCodeId = "";

    return [code, String(serviceCodeId)].every(value => !value || !value.trim());
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    this.getCodopsListByFilter();
  }

  getCodopsListByFilter(): void {
    this.isLoadingResults = true;
    const codopsFilter: CodopFilter = this.myForm.value;
    this.codopsService.getCodopsList(codopsFilter).subscribe((data: CodopsListResponse) => {
      this.isLoadingResults = false;
      this.codopList = data.codopList;
      if (this.codopList.length == 0 || data.type == 'error') {
        this.openSnackBar(
          "No se encontraron datos",
          "Revisa los filtros insertados"
        );
      }
      this.setCodopTable();
    });
  }
}