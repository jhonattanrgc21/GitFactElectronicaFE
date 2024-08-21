import { ValidatorFormService } from '../services/validator-form.service';
import { ReceiversService } from './../services/receivers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { numericPattern } from 'src/app/core/constants/pattherns';
import { IdentificationType } from './interfaces/identification-type.interface';
import { UpdateReceiver } from './interfaces/update-receiver.interface';
import { CreateReceiver } from './interfaces/create-receiver.interface';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';
import { ReceiverResponse } from './interfaces/receiver-response.interface';

@Component({
  selector: 'app-insert-receiver',
  templateUrl: './insert-receiver.component.html',
  styleUrls: ['./insert-receiver.component.css']
})
export class InsertReceiverComponent implements OnInit {
  titleForm: string;
  myForm: FormGroup;
  submitted: boolean = false;
  insertResponse: any;
  identificationTypelist: IdentificationType[] = [];
  public isLoadingResults: boolean = false;
  receiverId: number;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
		private dialog: MatDialog,
		private viewportRuler: ViewportRuler,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private receiversService: ReceiversService,
    private validatorFormService: ValidatorFormService
  ) {

    this.myForm = this._fb.group({
      receiverId: [],
      identificationTypeId: ['', Validators.required],
      identification: ['', [Validators.required, Validators.minLength(9),  this.validatorFormService.noWhitespaceValidator()]],
      name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(80), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.alphanumericValidator()]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern(numericPattern), Validators.maxLength(8), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.numericValidator()]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50), this.validatorFormService.noWhitespaceValidator()]],
      accountNumber: ['', this.validatorFormService.applyConditionalValidators([
        Validators.minLength(7),
        Validators.maxLength(10),
        Validators.pattern(numericPattern),
        this.validatorFormService.noWhitespaceValidator(),
        this.validatorFormService.numericValidator()
      ])],
      establishmentNumber: ['', this.validatorFormService.applyConditionalValidators([
        Validators.minLength(15),
        Validators.maxLength(15),
        Validators.pattern(numericPattern),
        this.validatorFormService.noWhitespaceValidator(),
        this.validatorFormService.numericValidator()
      ])],
    });

    // Escucha cambios en identificationTypeId
    this.myForm.get('identificationTypeId').valueChanges.subscribe(typeId => {
      this.updateIdentificationValidators(typeId);
    });
  }

  private updateIdentificationValidators(typeId: number) {
    const identificationControl = this.myForm.get('identification');

    if (!identificationControl) return;

    // Limpiar validadores anteriores
    identificationControl.clearValidators();

    switch (typeId) {
      case 1: // Cédula Nacional
        identificationControl.setValidators([
          Validators.minLength(11),
          Validators.maxLength(11),
          this.validatorFormService.noWhitespaceValidator()
        ]);
        break;

      case 2: // Cédula Jurídica
        identificationControl.setValidators([
          Validators.minLength(12),
          Validators.maxLength(12),
          this.validatorFormService.noWhitespaceValidator()
        ]);
        break;

      case 3: // Cédula de Residencia
        identificationControl.setValidators([
          Validators.minLength(12),
          Validators.maxLength(12),
          this.validatorFormService.noWhitespaceValidator()
        ]);
        break;



      default:
        identificationControl.setValidators([Validators.required]);
        break;
    }

    // Actualizar validaciones
    identificationControl.updateValueAndValidity();
  }


  ngOnInit() {
    this.identificationTypelist = this.activateRoute.snapshot.data['identificationtypelist'];
    this.receiverId = +this.activateRoute.snapshot.paramMap.get('id');
    if (this.receiverId) {
      this.titleForm = 'Edicion del Receptor';
      this.receiversService.getReceiverById(this.receiverId).subscribe((res: any) => {
        if (res.type == 'success') {
          const receiverData = res.receiver;
          this.f['receiverId'].setValue(receiverData.id);
          this.f['identificationTypeId'].setValue(receiverData.identificationTypeId);
          this.f['identification'].setValue(receiverData.identification);
          this.f['name'].setValue(receiverData.name);
          this.f['phoneNumber'].setValue(receiverData.phoneNumber);
          this.f['email'].setValue(receiverData.email);
          this.f['accountNumber'].setValue(receiverData.accountNumber);
          this.f['establishmentNumber'].setValue(receiverData.establishmentNumber);
        }
      });
    }
    else this.titleForm = 'Ingreso del Receptor';
  }

  get f() {
    return this.myForm.controls;
  }

  getMinLength(controlName: string): number | null {
    const control = this.myForm.get(controlName);
    const identificationTypeControl = this.myForm.get('identificationTypeId');

    if (control && control.errors && control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      const identificationType = identificationTypeControl ? identificationTypeControl.value : null;

      if (identificationType === 1 || identificationType === 2) {
        return requiredLength - 2;
      } else {
        return requiredLength;
      }
    }

    return null;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openAlertdialog(message: string){
		const viewportSize = this.viewportRuler.getViewportSize();
		const dialogRef = this.dialog.open(AlertPopupComponent, {
			width: viewportSize.width < 768 ? '380px' : '474px',
			height: 'auto',
			autoFocus: false,
      data: {message}
		});

		dialogRef.afterClosed().subscribe((result: any) => {
			this.router.navigate(['/receiversList']);
		});
  }

  onSubmit() {
    this.isLoadingResults = true;

    const formObj = {
      ...this.myForm.value,
      identification: this.myForm.value.identification.trim(),
      name: this.myForm.value.name.trim(),
      phoneNumber: this.myForm.value.phoneNumber.trim(),
      email: this.myForm.value.email.trim(),
      accountNumber: this.myForm.value.accountNumber.trim(),
      establishmentNumber: this.myForm.value.establishmentNumber.trim(),
    };

   const receiverAction$ = this.receiverId
      ? this.receiversService.updateReceiver(formObj as UpdateReceiver)
      : this.receiversService.createReceiver(formObj as CreateReceiver);

    // receiverAction$.subscribe((res: ReceiverResponse) => {
    //   this.isLoadingResults = false;
    //   if (res.type !== 'error')  this.openAlertdialog(res.message);
    //   else  this.openSnackBar(res.message, "");
    // });
  }

}
