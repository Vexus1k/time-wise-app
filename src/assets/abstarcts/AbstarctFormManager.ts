import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";

export abstract class AbstractFormManager {
  public form: FormGroup;
  public controlErrors: { [key: string]: boolean } = {};

  protected constructor(controlsConfig: { [key: string]: any }) {
    const controls = {};
    for (const key in controlsConfig) {
      const validators = controlsConfig[key].validate ? controlsConfig[key].validators : [];
      controls[key] = new FormControl(controlsConfig[key].initialValue || '', validators);
      this.controlErrors[key] = false;
    }
    this.form = new FormGroup(controls);
  }

  protected validateForm(form: FormGroup): void {
    if (form.invalid) {
      Object.keys(form.controls).forEach(controlName => {
        const control = form.controls[controlName];
        this.controlErrors[controlName] = control.invalid;
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

  protected isControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
