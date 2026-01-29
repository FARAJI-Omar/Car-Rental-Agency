import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CarActions } from '../../../store/cars/cars.actions';
import { selectAllCars, selectIsLoading, selectErrorMessage, selectFilteredCars } from '../../../store/cars/cars.selectors';
import { Car} from '../../../core/models/car';
import { Brand } from '../../../core/models/brand';
import { CarService } from '../../../core/services/car.service';
import { UpdateCar } from "../update-car/update-car";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, UpdateCar, RouterLink],
  templateUrl: './cars-list.html',
  styleUrl: './cars-list.css',
})
export class CarsList implements OnInit {
  private store = inject(Store);
  private carService = inject(CarService); 
  private route  = inject(ActivatedRoute);

  // UI State
  carToEdit = signal<Car | null>(null);
  viewMode = signal<'grid' | 'table'>('grid');
  
  cars = this.store.selectSignal(selectFilteredCars);  
  loading = this.store.selectSignal(selectIsLoading);
  errorMessage = this.store.selectSignal(selectErrorMessage);

  private carId = computed(() => this.route.snapshot.paramMap.get('id'));
  // 1. Convert the Observable stream to a Signal
  private allCars = toSignal(this.carService.getCars(), { initialValue: [] });
  car = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.allCars().find(c => c.id === id);
  });
  
  
  // Local Signal for Static Brands
  brands = signal<Brand[]>([]);

  /**
   * Computed Join: 
   * Automatically re-calculates whenever 'cars' or 'brands' change.
   * Merges car.brand_id with brand.title.
   */
  carsWithBrandNames = computed(() => {
    const allCars = this.cars();
    const allBrands = this.brands();

    return allCars.map(car => {
      const foundBrand = allBrands.find(b => b.id === car.brand_id);
      return {
        ...car,
        brandName: foundBrand ? foundBrand.title : 'Unknown Brand'
      };
    });
  });

  ngOnInit() {
    // 1. Fetch Cars via NgRx Effect
    this.store.dispatch(CarActions.loadCars());

    // 2. Fetch Static Brands via CarService
    this.carService.getBrands().subscribe({
      next: (data) => this.brands.set(data),
      error: (err) => console.error('Failed to load brands', err)
    });
  }

  onDelete(id: number) {
    if (confirm('Permanently delete this vehicle?')) {
      this.store.dispatch(CarActions.deleteCar({ id }));
    } 
  }

  onEdit(car: Car) {
    this.carToEdit.set(car);
  }

  toggleView(mode: 'grid' | 'table') {
  this.viewMode.set(mode);
}

}