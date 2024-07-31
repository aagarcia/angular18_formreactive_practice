import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressesBlockComponent, FormFieldComponent } from './components/components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormFieldComponent,
    AddressesBlockComponent,
  ],
})
export class AppComponent {
  title = 'my-app';
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresses: this.fb.array([]),
    });
  }

  get addresses(): FormArray {
    return this.myForm.get('addresses') as FormArray;
  }

  getAddressGroup(i: number): FormGroup {
    return this.addresses.at(i) as FormGroup;
  }

  addAddress(): void {
    const addressGroup = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.addresses.push(addressGroup);
  }

  onSubmit(): void {
    console.log(this.myForm.value);
  }
}
