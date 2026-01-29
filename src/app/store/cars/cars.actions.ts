// "What" happened (e.g., Load Cars)

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Car } from '../../core/models/car';

export const CarActions = createActionGroup({
    source: 'Cars page',    // where the action is coming from
    events: {
        // 1. To start the process (No data needed, just a "ping")
        'Load Cars': emptyProps(),
        // 2. When the API returns data (We need to carry the Car array)
        'Load Cars Success': props<{ cars: Car[] }>(),
        // 3. When the API fails (We need to carry the error message)
        'Load Cars Failure': props<{ error: string }>(),
        // 4. To add a new car (We need to carry the new car object)
        'Add Car': props<{ car: Car }>(),
        
        'Add Car Success': props<{ car: Car }>(),
        // 5. To delete a car (We only need the ID)
        'Delete Car': props<{ id: number }>(),
        // 6. When the car is successfully deleted (We need the ID)
        'Delete Car Success': props<{ id: number }>(),
        // 7. When deleting a car fails (We need the error message)
        'Delete Car Failure': props<{ error: string }>(),
        // 8. To update a car (We need the updated car object)
        'Update Car': props<{ car: Car }>(),
        // 9. When the car is successfully updated (We need the updated car object)
        'Update Car Success': props<{ car: Car }>(),
        // 10. To get a car by ID (We need the ID)
        'Get Car By ID': props<{ id: number }>(),

        'Update Filters': props<{ brandId?: number | null, availableOnly?: boolean, soldOnly?: boolean }>(),

        // toggle add form visibility
'       Toggle Add Form': props<{ show: boolean }>(),
    }
})