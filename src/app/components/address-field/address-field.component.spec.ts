import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressFieldComponent } from './address-field.component';
import { CommonModule } from '@angular/common';
import { of, throwError } from 'rxjs';
import { ApiService } from '../../services/api.service';

describe('AddressFieldComponent', () => {
  let component: AddressFieldComponent;
  let fixture: ComponentFixture<AddressFieldComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    // Crear un espía para ApiService
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getCountries', 'postGetCities']);

    await TestBed.configureTestingModule({
      imports: [AddressFieldComponent, ReactiveFormsModule, CommonModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    }).compileComponents();

    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFieldComponent);
    component = fixture.componentInstance;
    apiService.getCountries.and.returnValue(of({ data: [{ country: 'Country1' }, { country: 'Country2' }] }));
    apiService.postGetCities.and.returnValue(of({ data: ['City1', 'City2'] }));
    
    component.formGroup = new FormGroup({
      country: new FormControl(''),
      city: new FormControl('')
    });
    component.controlName = 'country';
    component.label = 'Country';
    component.errorMessage = 'Error';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label and input field for country', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toContain('Country');
    expect(compiled.querySelector('select')?.getAttribute('id')).toBe('country');
  });

  it('should display country options', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.controlName = 'country';
    fixture.detectChanges();
    const options = compiled.querySelectorAll('select option');
    expect(options[1].textContent).toContain('Country1');
    expect(options[2].textContent).toContain('Country2');
  });

  it('should update city options when country is selected', () => {
    // Configura el componente para mostrar el select de país
    component.controlName = 'country';
    fixture.detectChanges();
  
    // Simula la selección de un país
    const countryControl = component.formGroup.get('country');
    countryControl?.setValue('Country1'); // Asegúrate de que este valor sea el esperado por el servicio de prueba
    fixture.detectChanges();
  
    // Cambia el controlName a 'city' para verificar el select de ciudad
    component.controlName = 'city';
    fixture.detectChanges(); // Asegura que la vista se actualice
  
    const compiled = fixture.nativeElement as HTMLElement;
  
    // Verifica la existencia del select de ciudades
    const citySelect = compiled.querySelector('select[id="city"]');
    expect(citySelect).toBeTruthy();
  
    // Verifica las opciones en el select de ciudades
    const cityOptions = citySelect?.querySelectorAll('option');
    
    // Asegúrate de que cityOptions no sea undefined y tenga opciones
    if (cityOptions) {
      expect(cityOptions.length).toBeGreaterThan(1); // Asegúrate de que haya más de una opción (incluyendo la opción deshabilitada)
      expect(cityOptions[1]?.textContent).toContain('City1');
      expect(cityOptions[2]?.textContent).toContain('City2');
    } else {
      fail('City options not found.');
    }
  });
  
  
  it('should display error message', () => {
    component.controlName = 'country';
    fixture.detectChanges();
    const control = component.formGroup.get('country');
    control?.markAsTouched();
    control?.setValue(''); // Establece un valor que no cumple con el validador si es necesario
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-red-600')?.textContent).toContain(component.errorMessage);
  });

  it('should handle API errors gracefully', () => {
    apiService.getCountries.and.returnValue(throwError(() => new Error('API error')));
    apiService.postGetCities.and.returnValue(throwError(() => new Error('API error')));
    
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.listPaises).toEqual([]);
    expect(component.listCiudades).toEqual([]);
  });
});
