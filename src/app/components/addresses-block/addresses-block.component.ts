import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressFieldComponent } from '../address-field/address-field.component';

@Component({
  selector: 'app-addresses-block',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AddressFieldComponent],
  templateUrl: './addresses-block.component.html',
})
export class AddressesBlockComponent {
  @Input() addressGroup!: FormGroup;
  @Input() index!: number;
}
