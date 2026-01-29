// The global "Database" interface

import { CarState } from "./cars/cars.state";


export interface AppState {
    cars: CarState;
}