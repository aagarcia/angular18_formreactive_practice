import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, map, tap } from 'rxjs/operators';
import { AddressesBlockComponent, FormFieldComponent } from './components/components';
import { ApiService } from './services/api.service';

/* import { Ciudad } from '../interface/pais'; */

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
export class AppComponent implements OnInit {
  title = 'my-app';
  myForm: FormGroup;
  data: any;
/*   respuesta?: Ciudad;
  respuestas?: <Ciudad>[]; */

  constructor(private fb: FormBuilder, private myService: ApiService) {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addresses: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.myService.getData()/* .pipe(
      map( this.getPais )
    ) */.subscribe({
      next: (response) => (this.data = response),
      error: (error) => console.error('Error fetching data', error),
      complete: () => console.log('Completado'),
    });
  }

  /* private getPais( paises: any[] ) {
    this.respuestas = paises.map<Ciudad>( (value) => {
      this.respuesta = value;
      return this.respuesta;
    });
  }; */

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
