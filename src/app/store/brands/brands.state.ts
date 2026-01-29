import { Brand } from '../../core/models/brand';

export interface BrandState {
  brands: Brand[];
}

export const initialBrandState: BrandState = {
  brands: []
};