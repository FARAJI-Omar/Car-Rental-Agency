import { createReducer, on } from "@ngrx/store";
import { initialCarState } from "./cars.state";
import { CarActions } from "./cars.actions";

export const carReducer = createReducer(
    initialCarState,
    // actions handlers go here using "on"
    on(CarActions.loadCars, (state) => ({ ...state, loading: true, error: null })),
    
    on(CarActions.loadCarsSuccess, (state, { cars }) => ({ ...state, cars: cars, loading: false }) ),

    on(CarActions.loadCarsFailure, (state, { error }) => ({ ...state, loading: false, error: error }) ),

    on(CarActions.addCar, (state) => ({ ...state, loading: true }) ),
    on(CarActions.addCarSuccess, (state, { car }) => ({ ...state, cars: [...state.cars, car], loading: false }) ),

    on(CarActions.deleteCar, (state) => ({ ...state, loading: true }) ),
    on(CarActions.deleteCarSuccess, (state, { id }) => ({ ...state, cars: state.cars.filter(car => car.id !== id), loading: false }) ),
    on(CarActions.deleteCarFailure, (state) => ({ ...state, loading: false }) ),

    on(CarActions.updateCar, (state) => ({ ...state, loading: true })),
    on(CarActions.updateCarSuccess, (state, { car }) => ({...state, cars: state.cars.map(c => c.id === car.id ? car : c)}) ),

    on(CarActions.updateFilters, (state, { brandId, availableOnly, soldOnly }) => ({
        ...state,
        filters: {
            ...state.filters,
            brandId: brandId !== undefined ? brandId : state.filters.brandId,
            availableOnly: availableOnly !== undefined ? availableOnly : state.filters.availableOnly,
            soldOnly: soldOnly !== undefined ? soldOnly : state.filters.soldOnly
        }
    })),

    on(CarActions.toggleAddForm, (state, { show }) => ({
        ...state,
        showAddForm: show
    })),
    // Automatically hide when a car is successfully added
    on(CarActions.addCarSuccess, (state) => ({ ...state, showAddForm: false }))
)