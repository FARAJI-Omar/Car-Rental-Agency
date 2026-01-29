import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CarService } from "../../core/services/car.service";
import { inject } from "@angular/core";
import { BrandActions } from "./brands.actions";
import { catchError, map, mergeMap, of } from "rxjs";

export const loadBrandsEffect = createEffect(
  (actions$ = inject(Actions), carService = inject(CarService)) => {
    return actions$.pipe(
      ofType(BrandActions.loadBrands),
      mergeMap(() => carService.getBrands().pipe(
        map(brands => BrandActions.loadBrandsSuccess({ brands })),
        catchError(err => of(BrandActions.loadBrandsFailure({ error: err.message })))
      ))
    );
  },
  { functional: true }
);