// sidebar.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BrandActions } from '../../../store/brands/brands.actions';
import { selectAllBrands, selectAllCars } from '../../../store/cars/cars.selectors';
import { CarActions } from '../../../store/cars/cars.actions';
import { CommonModule } from '@angular/common';
 

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar implements OnInit {
  private store = inject(Store);

  brands = this.store.selectSignal(selectAllBrands);
  cars = this.store.selectSignal(selectAllCars);
  activeBrandId: number | null = null;

   ngOnInit() {
    this.store.dispatch(BrandActions.loadBrands());
  }

  // Helper to get count of cars per brand
  getBrandCount(brandId: number): number {
    return this.cars().filter(car => car.brand_id === brandId).length;
  }

  onBrandSelect(id: number | null) {
    this.activeBrandId = id;
    this.store.dispatch(CarActions.updateFilters({ brandId: id }));  }

  availableChecked = false;
  soldChecked = false;

  onToggleAvailability(event: any, type: 'available' | 'sold') {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (type === 'available') {
      this.availableChecked = isChecked;
    } else {
      this.soldChecked = isChecked;
    }
    this.store.dispatch(CarActions.updateFilters({ availableOnly: this.availableChecked, soldOnly: this.soldChecked }));
  }
  
}