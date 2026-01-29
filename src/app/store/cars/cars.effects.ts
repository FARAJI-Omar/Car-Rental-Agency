import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CarService } from '../../core/services/car.service';
import { CarActions } from './cars.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export const loadCarsEffect = createEffect(
  // 1. Inject the 'Actions' stream and the 'CarService'
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
      // 2. Listen ONLY for the 'Load Cars' action
      ofType(CarActions.loadCars),
      // 3. Switch from the Action stream to the API stream
      mergeMap(() => carService.getCars().pipe(
        // 4. On success, dispatch the 'Success' action with the data
        map(cars => CarActions.loadCarsSuccess({ cars })),
        // 5. On error, dispatch the 'Failure' action with the message
        catchError(error => of(CarActions.loadCarsFailure({ error: error.message })))
      ))
    );
    },
    {functional: true }
);

export const deleteCarEffect = createEffect(
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
        ofType(CarActions.deleteCar),
        mergeMap(({ id }) => carService.deleteCar(id).pipe(
        map(() => (CarActions.deleteCarSuccess({ id }))),
        catchError((error) => of(CarActions.deleteCarFailure({error: error.message})))
        ))
    );
  },
   {functional: true }
);

export const addCarEffect = createEffect(
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
        ofType(CarActions.addCar),
        mergeMap(({ car }) => carService.addCar(car).pipe(
        map((newCar) => CarActions.addCarSuccess({ car: newCar })),
        catchError(() => of({ type: '[Cars API] Add Failure' }))
        ))
    );
  },
   {functional: true }
);

export const updateCarEffect = createEffect(
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
        ofType(CarActions.updateCar),
        mergeMap(({ car }) => carService.updateCar(car).pipe(
        map((updatedCar) => CarActions.updateCarSuccess({ car: updatedCar })),
        catchError(() => of({ type: '[Cars API] Update Failure' }))
        ))
    );
  },
   {functional: true }
);