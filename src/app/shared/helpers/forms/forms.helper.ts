import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export const isControlInvalid = (abstractControl: AbstractControl): boolean => {
  return abstractControl && abstractControl.errors && abstractControl.touched;
};

export const getControlErrors = (
  controlName: string,
  formgroup: FormGroup,
  errors: any
): string => {
  const control = formgroup.get(controlName);
  return control && control.errors
    ? errors[controlName][Object.keys(control.errors)[0]]
    : "";
};

export const getFormControl = (
  abstractControl: AbstractControl
): FormControl => {
  return abstractControl as FormControl;
};
