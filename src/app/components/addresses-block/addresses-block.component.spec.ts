import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesBlockComponent } from './addresses-block.component';

describe('AddressesBlockComponent', () => {
  let component: AddressesBlockComponent;
  let fixture: ComponentFixture<AddressesBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressesBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressesBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
