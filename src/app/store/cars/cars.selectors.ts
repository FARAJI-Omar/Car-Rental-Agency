// "Queries" to get specific data for the UI

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CarState } from "./cars.state";

// 1. Find the 'cars' slice in the global state
export const selectCarState = createFeatureSelector<CarState>('cars');

// 2. Select the 'cars' array from that slice
export const selectAllCars = createSelector(selectCarState, (state) => state.cars);

// 3. Select the 'loading' boolean
export const selectIsLoading = createSelector(selectCarState, (state) => state.loading);

// 4. Select the 'error' message
export const selectErrorMessage = createSelector(selectCarState, (state) => state.error);

//5. select brands
export const selectAllBrands = createSelector(
  createFeatureSelector<any>('brands'),
  (state) => state.brands
);

export const selectCarsWithBrands = createSelector(
  selectAllCars,
  selectAllBrands,
  (cars, brands) => {
    return cars.map(car => ({
      ...car,
      brandName: brands.find((b: { id: number; title: string }) => b.id === car.brand_id)?.title || 'Unknown'
    }));
  }
);

export const selectFilters = createSelector(selectCarState, (state) => state.filters);

export const selectFilteredCars = createSelector(
  selectAllCars,
  selectFilters,
  (cars, filters) => {
    return cars.filter(car => {
      const matchBrand = filters.brandId ? car.brand_id === filters.brandId : true;
      const matchAvail = filters.availableOnly ? car.availability === true : true;
      const matchSold = filters.soldOnly ? car.availability === false : true;
      // If both are false, show all. If both are true, show all. If only one is true, filter accordingly.
      if (filters.availableOnly && filters.soldOnly) {
        return matchBrand;
      }
      return matchBrand && matchAvail && matchSold;
    });
  }
);