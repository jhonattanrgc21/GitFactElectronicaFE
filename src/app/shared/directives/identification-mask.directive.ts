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
    let formattedValue = value.replace(/\D/g, ''); // Eliminar todos los caracteres no numéricos

    if (!formattedValue) {
      this.control.control.setValue('', { emitEvent: false });
      return;
    }

    switch (this.identificationTypeId) {
      case 1: // CEDULA NACIONAL - 9 caracteres (Ej: 4-0227-0398)
        formattedValue = formattedValue.substring(0, 9); // Limitar a 9 dígitos
        formattedValue = formattedValue.replace(/^(\d)(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
          return p3 ? `${p1}-${p2}-${p3}` : p2 ? `${p1}-${p2}` : `${p1}`;
        });
        break;

      case 2: // CEDULA JURIDICA - 10 caracteres (Ej: 3-101-593961)
      formattedValue = formattedValue.substring(0, 10); // Limitar a 10 dígitos
      formattedValue = formattedValue.replace(/^(\d)(\d{0,3})(\d{0,6})/, (match, p1, p2, p3) => {
        return p3 ? `${p1}-${p2}-${p3}` : p2 ? `${p1}-${p2}` : `${p1}`;
      });
      break;

      case 3: // CEDULA RESIDENCIA - 12 caracteres (Ej: 155814118532)
        formattedValue = formattedValue.substring(0, 12); // Limitar a 12 dígitos
        break;

      default:
        break;
    }

    // Establecer el valor formateado en el control de formulario
    this.control.control.setValue(formattedValue, { emitEvent: false });
  }
}
