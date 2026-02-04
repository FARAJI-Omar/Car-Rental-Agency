import { createActionGroup, emptyProps, props } from '@ngrx/store'; 
import { Brand } from '../../core/models/brand';

export const BrandActions = createActionGroup({
  source: 'Brands API',
  events: {
    // 1. Trigger the load process
    'Load Brands': emptyProps(),
    
    // 2. Successfully received brands from API
    'Load Brands Success': props<{ brands: Brand[] }>(),
    
    // 3. API Error
    'Load Brands Failure': props<{ error: string }>(),
    
    // Optional: If you want to filter in the store
    'Set Selected Brand': props<{ brandId: number | null }>(),
  }
});