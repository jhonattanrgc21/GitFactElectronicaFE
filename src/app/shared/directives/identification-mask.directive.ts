import { Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appIdentificationMask]'
})
export class IdentificationMaskDirective implements OnChanges {

  @Input('appIdentificationMask') identificationTypeId: number;

  constructor(private el: ElementRef, private control: NgControl) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['identificationTypeId'] && this.control.control.value) {
      this.applyMask(this.control.control.value);
    }
  }

  @HostListener('input', ['$event']) onInputChange(event: any) {
    this.applyMask(event.target.value);
  }

  private applyMask(value: string) {
    let formattedValue = value.replace(/\D/g, '');

    if (!formattedValue) {
      this.control.control.setValue('', { emitEvent: false });
      return;
    }

    switch (this.identificationTypeId) {
      case 1: // CEDULA NACIONAL
        formattedValue = formattedValue.replace(/^(\d)(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
          return p3 ? `${p1}-${p2}-${p3}` : p2 ? `${p1}-${p2}` : `${p1}`;
        });
        break;
      case 2: // CEDULA RESIDENCIA
        break;
      case 3: // CEDULA JURIDICA
        formattedValue = formattedValue.replace(/^(\d)(\d{0,3})(\d{0,6})/, (match, p1, p2, p3) => {
          return p3 ? `${p1}-${p2}-${p3}` : p2 ? `${p1}-${p2}` : `${p1}`;
        });
        break;
      default:
        break;
    }

    this.control.control.setValue(formattedValue, { emitEvent: false });
  }
}
