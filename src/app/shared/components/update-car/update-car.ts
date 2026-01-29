import { Component, inject, Input, OnChanges, OnInit, signal, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Car } from '../../../core/models/car';
import { Brand } from '../../../core/models/brand';
import { CarActions } from '../../../store/cars/cars.actions';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-car.html',
  styleUrl: './update-car.css'
})
export class UpdateCar implements OnInit, OnChanges {
  @Input({ required: true }) car!: Car;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private store = inject(Store);
  private carService = inject(CarService);

  brands = signal<Brand[]>([]);

  updateForm = this.fb.group({
    id: [0],
    brand_id: [0, Validators.required],
    model: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    fuel: ['', Validators.required],
    image: [''],
    availability: [true],
    saleDate: ['', Validators.required]
  });

  ngOnInit() {
    // Fetch brands for the dropdown from your CarService
    this.carService.getBrands().subscribe(data => this.brands.set(data));
  }

  ngOnChanges() {
    if (this.car) {
      this.updateForm.patchValue(this.car);
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updatedCar = this.updateForm.getRawValue() as Car;
      this.store.dispatch(CarActions.updateCar({ car: updatedCar }));
      this.close.emit(); // Close the form after dispatching
    }
  }
}