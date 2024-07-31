import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormFieldComponent } from './form-field.component';
import { CommonModule } from '@angular/common';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, ReactiveFormsModule, CommonModule], // Importa el componente standalone
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      testControl: new FormControl('', { validators: [Validators.required] }), // Agrega un validador para provocar un error
    });
    component.controlName = 'testControl';
    component.label = 'Test Label';
    component.errorMessage = 'Test Error Message';
    fixture.detectChanges(); // Inicializa la vista
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('label')?.textContent).toContain(component.label);
  });

  it('should display error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const control = component.formGroup.get('testControl');
    
    control?.markAsTouched(); // Marca el control como tocado
    control?.setValue(''); // Establece un valor que no cumple con el validador
    control?.updateValueAndValidity(); // Actualiza la validez del control
    
    fixture.detectChanges(); // Actualiza la vista
    
    const errorMessageElement = compiled.querySelector('.text-red-600');
    expect(errorMessageElement?.textContent).toContain(component.errorMessage);
  });
});
