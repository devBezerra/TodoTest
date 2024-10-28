import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidateRequired(control: AbstractControl): any {
  if (!control.value) {
    return {
      validate: false,
      message: '* Campo obrigatório',
    };
  }

  return null;
}

export function ValidateIsInteger(control?: AbstractControl): any {
  if (!Number.isInteger(control?.value)) {
    return {
      validate: false,
      message: 'O valor deve ser inteiro',
    };
  }
}

export function ValidateIsPositive(control: AbstractControl): any {
  if (parseInt(control.value) < 0) {
    return {
      validate: false,
      message: 'O valor deve ser positivo.',
    };
  }
}

export function ValidateMinLength(length: number): any {
  return (control: AbstractControl): any => {
    if (parseInt(control.value?.length) < length) {
      let message: string;
      if (length > 1) {
        message = `Ao menos ${length} valores devem ser selecionados`;
      } else {
        message = `Ao menos ${length} valor deve ser selecionado`;
      }
      return {
        validate: false,
        message,
      };
    }
  };
}

export function ValidateIsNumber(control?: AbstractControl): any {
  if (
    typeof control?.value !== 'number' ||
    Number.isNaN(Number(control?.value))
  ) {
    return {
      validate: false,
      message: 'O valor deve ser um número',
    };
  }
}

export class ValidateFields {
  thisUpdateValidators(form: FormGroup): any {
    for (const key in form.controls) {
      if (form.controls.hasOwnProperty(key)) {
        form.controls[key].markAsTouched();
      }
    }
    return form;
  }
}
