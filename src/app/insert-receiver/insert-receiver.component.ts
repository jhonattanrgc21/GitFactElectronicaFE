import { ValidatorFormService } from '../services/validator-form.service';
import { ReceiversService } from './../services/receivers.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { emailPattern, lettersPattern, numericPattern } from 'src/app/core/constants/pattherns';

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
  identificationTypelist: any = [];
  isLoadingResults: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private receiversService: ReceiversService,
    private validatorFormService: ValidatorFormService
  ) {

    this.myForm = this._fb.group({
      id: [],
      identificationTypeId: ['', Validators.required ],
      identification: ['', [Validators.required, Validators.minLength(9), this.validatorFormService.noWhitespaceValidator()]],
      name: ['', [Validators.required, Validators.pattern(lettersPattern), Validators.minLength(15),Validators.maxLength(80), this.validatorFormService.noWhitespaceValidator(),  this.validatorFormService.alphanumericValidator()]],
      phoneNumber:['',[Validators.required,Validators.minLength(8),Validators.pattern(numericPattern),Validators.maxLength(8), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.numericValidator()]],
      email:['',[Validators.required, Validators.email, Validators.pattern(emailPattern), Validators.maxLength(50), this.validatorFormService.noWhitespaceValidator()]],
      accountNumber:['',[Validators.minLength(7),Validators.pattern(numericPattern),Validators.maxLength(10), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.numericValidator()]],
      establishment:['',[Validators.minLength(15),Validators.pattern(numericPattern),Validators.maxLength(15), this.validatorFormService.noWhitespaceValidator(), this.validatorFormService.numericValidator()]],
    });
  }

  ngOnInit() {
    this.getIndentificationTypeList();
    const receiverId = this.route.snapshot.paramMap.get('id');
    if (receiverId) this.titleForm = 'Edicion del Receptor';
    else this.titleForm = 'Ingreso del Receptor';
  }

  get f() {
    return this.myForm.controls;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getIndentificationTypeList() {
    this.isLoadingResults = true;
    this.receiversService.getlistidentificationtype().subscribe(res => {
      this.isLoadingResults = false;
      this.identificationTypelist = res
    });
  }

  onSubmit(){
    let formObj = this.myForm.value;
    formObj.identification = formObj.identification.trim();
    formObj.name = formObj.name.trim();
    formObj.phoneNumber = formObj.phoneNumber.trim();
    formObj.email = formObj.email.trim();
    formObj.accountNumber = formObj.accountNumber.trim();
    formObj.establishment = formObj.establishment.trim();
  }

}
