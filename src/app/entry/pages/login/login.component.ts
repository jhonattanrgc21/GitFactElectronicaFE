import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import {
  getControlErrors,
  getFormControl,
  isControlInvalid,
} from "src/app/shared/helpers/forms/forms.helper";
import { AuthService } from "../../../core/auth/services/auth/auth.service";
import { LOGIN_FORM_ERRORS } from "../../constants/login-form-errors";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnDestroy, OnInit {
  public subscriptions: Subscription;
  public isPasswordShowed: boolean;
  public loginForm: FormGroup;
  public channelId: number;
  public loginFormErrors: any;
  public messageError: string;
  public errorL: boolean;

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
    private authService: AuthService,
    private router: Router
  ) {
    this.isPasswordShowed = false;
    this.channelId = 117;
    this.loginFormErrors = LOGIN_FORM_ERRORS;
    this.errorL = false;
    this.subscriptions = new Subscription();
  }

  public ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
    this.subscriptions.add(this.handleAuthLoginErrorSubscription());
    this.subscriptions.add(this.handleAuthLoginSuccessSubscription());
  }

  public handleAuthLoginErrorSubscription(): Subscription {
    return this.authService.authLoginError$.subscribe((error: string) => {
      if (error) {
        this.messageError = error;
        this.errorL = true;
        console.log(this.errorL);
        console.log(error);
      }
    });
  }

  public handleAuthLoginSuccessSubscription(): Subscription {
    return this.authService.authLoginSuccess$.subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(["/billList"]);
      }
    });
  }

  public showPassword(): void {
    this.isPasswordShowed = !this.isPasswordShowed;
  }

  public passwordType(): string {
    return this.isPasswordShowed ? "text" : "password";
  }

  private buildLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      channelId: [this.channelId],
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.errorL = false;
      this.authService.onLogin(this.loginForm.getRawValue());
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
