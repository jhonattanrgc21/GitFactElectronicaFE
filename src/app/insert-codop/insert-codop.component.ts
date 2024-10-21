import { Component, OnInit } from '@angular/core';
import { CodopsService } from '../services/codops.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceCode } from '../codops-list/interfaces/service-code.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { ValidatorFormService } from '../services/validator-form.service';
import { numericPattern } from '../core/constants/pattherns';
import { Codop } from '../codops-list/interfaces/codops-list.interface';
import { GeneralResponse } from '../shared/interfaces/generalResponse.interface';
import { ConfirmationPopupComponent } from '../shared/components/confirmation-popup/confirmation-popup.component';
import { InformationPopupComponent } from './components/information-popup/information-popup.component';

@Component({
  selector: 'app-insert-codop',
  templateUrl: './insert-codop.component.html',
  styleUrls: ['./insert-codop.component.css']
})
export class InsertCodopComponent implements OnInit {

  titleForm: string;
  myForm: FormGroup;
  submitted: boolean = false;
  insertResponse: any;
  serviceCodeList: ServiceCode[];
  isLoadingResults: boolean = false;

  constructor(
    private codopsService: CodopsService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private viewportRuler: ViewportRuler,
    private snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private validatorFormService: ValidatorFormService
  ) {
    this.myForm = this._fb.group({
      code: ['', [
        Validators.required,
        this.validatorFormService.applyConditionalValidators([
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(numericPattern),
          this.validatorFormService.noWhitespaceValidator(),
          this.validatorFormService.numericValidator()
        ])
      ]],
      type: ['', [Validators.required, Validators.maxLength(40), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.alphanumericWithSpecialCharactersValidator()]],
      operator: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(80), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.alphanumericWithSpecialCharactersValidator()]],
      iva: ['', Validators.required],
      isIva: ['', Validators.required],
      serviceCodeId: ['', Validators.required],
      isActive: ['', Validators.required]
    });

    this.myForm.get('iva').valueChanges.subscribe(() => {
      this.checkConflictingIva();
    });

    this.myForm.get('isIva').valueChanges.subscribe(() => {
      this.checkConflictingIva();
    });

  }

  get f() {
    return this.myForm.controls;
  }

  private checkConflictingIva() {
    const iva = this.myForm.get('iva').value;
    const isIva = this.myForm.get('isIva').value;

    if (iva !== null && isIva !== null && iva === isIva) {
      this.myForm.get('isIva').setErrors({ conflictingIva: true });
    } else {
      this.myForm.get('isIva').setErrors(null); // Limpiar el error si no hay conflicto
    }
  }

  ngOnInit() {
    this.titleForm = 'Ingreso del codop';
    this.serviceCodeList = this.activateRoute.snapshot.data['serviceCodeList'];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openInformationDialog(message: string){
		const viewportSize = this.viewportRuler.getViewportSize();
		const dialogRef = this.dialog.open(InformationPopupComponent, {
			width: viewportSize.width < 768 ? '380px' : '474px',
			height: 'auto',
			autoFocus: false,
      data: {message}
		});

		dialogRef.afterClosed().subscribe((result: any) => {
			this.router.navigate(['/codopsList']);
		});
  }


  onSubmit() {
    let codop : Codop = this.myForm.value;
    codop.code = codop.code.trim();
    codop.type = codop.type.trim();
    codop.description = codop.description.trim();


    const viewportSize = this.viewportRuler.getViewportSize();
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: viewportSize.width < 768 ? '380px' : '474px',
      height: 'auto',
      autoFocus: false,
      data: {
        message: 'Esta operación no se puede deshacer. ¿Está seguro de que desea continuar?',
        messageTitleButtonLeft: 'Cancelar',
        messageTitleButtonRight: 'Confirmar'
      }
    });

		dialogRef.afterClosed().subscribe((result: any) => {
      if(result){
        this.isLoadingResults = true;
        this.codopsService.createCodop(codop).subscribe((res: GeneralResponse) => {
          this.isLoadingResults = false;
          if (res.type !== 'error') this.openInformationDialog(res.message);
          else this.openSnackBar('Error', res.message);
        });
      }
		});

  }
}
