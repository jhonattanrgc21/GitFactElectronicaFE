import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { RecipientsBillService } from "src/app/services/recipients-bill-service";
import {
  getControlErrors,
  getFormControl,
  isControlInvalid,
} from "src/app/shared/helpers/forms/forms.helper";
import { RESEND_FORM_ERRORS } from "../../constants/resed-form-error";
import { PublicServiceReceipts } from "../../recipients-bill.component";

@Component({
  selector: "app-resend-email-modal",
  templateUrl: "./resend-email-modal.component.html",
  styleUrls: ["./resend-email-modal.component.css"],
})
export class ResendEmailModalComponent implements OnInit {
  @Output() public closeResendModal: EventEmitter<boolean>;
  @Input() public selectedReceipt: PublicServiceReceipts;
  public resendForm: FormGroup;
  public resendFormErrors: any;

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
    private formBuilder: FormBuilder,
    private publicservice: RecipientsBillService
  ) {
    this.closeResendModal = new EventEmitter<boolean>();
    this.resendFormErrors = RESEND_FORM_ERRORS;
  }

  public ngOnInit(): void {
    this.resendForm = this.buildResendForm();
  }

  private buildResendForm(): FormGroup {
    return this.formBuilder.group({
      email: [this.selectedReceipt.email, [Validators.required]],
    });
  }

  public resendEmail(): void {
    if (this.resendForm.valid) {
      this.publicservice.resendBillPDF(
        this.selectedReceipt.consecutiveNumber,
        this.resendForm.controls.email.value
      );
      this.closeResendEmailModal();
    } else {
      this.resendForm.get(this.selectedReceipt.email).markAsTouched();
    }
  }

  public closeResendEmailModal(): void {
    this.closeResendModal.emit();
  }
}
