import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Car } from '../../../core/models/car';
import { Brand } from '../../../core/models/brand';
import { CarActions } from '../../../store/cars/cars.actions';
import { CarService } from '../../../core/services/car.service';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-car.html',
  styleUrl: './add-car.css'
})
export class AddCar implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private carService = inject(CarService);

  // Signal to store brands for the dropdown
  brands = signal<Brand[]>([]);

  addForm = this.fb.group({
    brand_id: [null as number | null, Validators.required],
    model: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    fuel: ['diesel', Validators.required],
    image: ['https://placehold.co/200'],
    availability: [true],
    saleDate: ['', Validators.required]
  });

  ngOnInit() {
    // Fetch static brands from service
    this.carService.getBrands().subscribe(data => this.brands.set(data));
  }

  onSubmit() {
    if (this.addForm.valid) {
      const newCar = this.addForm.getRawValue() as Car;
      
      // Dispatch the add action (ID is typically handled by the backend/json-server)
      this.store.dispatch(CarActions.addCar({ car: newCar }));
      
      // Reset form to initial state
      this.addForm.reset({
        fuel: 'diesel',
        availability: true,
        image: 'https://placehold.co/200'
      });
    }
  }

  onCancel() {
    // This tells the store to hide the form
    // Because Main is listening to showAddForm(), the component is destroyed
    this.store.dispatch(CarActions.toggleAddForm({ show: false }));
  }
}