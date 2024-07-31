import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-address-field',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address-field.component.html',
})
export class AddressFieldComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;
  @Input() errorMessage!: string;

  listPaises: string[] = [];
  listCiudades: string[] = [];

  constructor(private myService: ApiService) {}

  ngOnInit(): void {

    if (this.controlName === 'country') {
      /* this.myService.getData().pipe(
        map<any[], Pais[]>( this.getPais ),
      ).subscribe({
        next: (response) => (this.listPaises = response),
        error: (error) => console.error('Error fetching data', error),
      }); */
      this.myService.getCountries()
      .pipe(
        map((data) => data.data ),
        map((data) => data.map(({country}: any) => country))
      )
      .subscribe({
        next: (response) => (this.listPaises = response),
        error: (error) => console.error(`Error fetching data: ${error}`)
      });
    }

    if (this.controlName === 'city') {
      this.formGroup.get('country')?.valueChanges.subscribe((value) => {
        if (value) {
          this.myService.postGetCities(value)
          .pipe(
            map<any, string[]>( this.getCiudad ),
          )
          .subscribe({
            next: (response) => (this.listCiudades = response),
            error: (error) => console.error('Error fetching data', error),
          });
        }
      });
    }
  }

  /* private getPais(value: any[]): Pais[] {
    const list: Pais[] = value.map<Pais>((val: any) => {
      const pais: Pais = val;
      return pais;
    });

    return list.sort((a, b) => (a.name.common > b.name.common ? 1 : -1));

    const listFilter = list.filter((value) => value.name.common === 'Ecuador');

    return listFilter;
  }; */

  private getCiudad(value: any): string[] {
    const { data } = value;

    const list: string[] = data;

    return list.sort((a, b) => (a > b ? 1 : -1));
  }
}
