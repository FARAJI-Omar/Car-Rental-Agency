import { createReducer, on } from '@ngrx/store';
import { Brand } from '../../core/models/brand';
import { BrandActions } from './brands.actions';

export interface BrandState {
  brands: Brand[];
  loading: boolean;
  error: string | null;
}

export const initialBrandState: BrandState = {
  brands: [],
  loading: false,
  error: null
};

export const brandReducer = createReducer(
  initialBrandState,

  // Start loading
  on(BrandActions.loadBrands, (state) => ({ 
    ...state, 
    loading: true, 
    error: null 
  })),

  // Success: Save the brands to state
  on(BrandActions.loadBrandsSuccess, (state, { brands }) => ({ 
    ...state, 
    brands: brands, 
    loading: false 
  })),

  // Failure: Save the error message
  on(BrandActions.loadBrandsFailure, (state, { error }) => ({ 
    ...state, 
    loading: false, 
    error: error 
  }))
);