import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorFormService {

  constructor() { }


	noWhitespaceValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } | null => {
			const isValid = /^(?!\s*$).+/i.test(control.value);
			return isValid ? null : { required: true };
		};
	}

  alphanumericValidator(): ValidatorFn {
    const regex: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿÑñÄäËëÏïÖöÜüŸÿ\s.,]*$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = regex.test(control.value);
      return isValid ? null : { invalidCharacter: true };
    };
  }

  numericValidator(): ValidatorFn {
    const regex: RegExp = /^[0-9]*$/;
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = regex.test(control.value);
      return isValid ? null : { invalidNumber: true };
    };
  }

  applyConditionalValidators(validators: ValidatorFn[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        return Validators.compose(validators)(control);
      }
      return null;
    };
  }
}
