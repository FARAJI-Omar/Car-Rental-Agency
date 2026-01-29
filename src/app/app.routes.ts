import { Routes } from '@angular/router';
import { CarsList } from './shared/components/cars-list/cars-list';
import { AddCar } from './shared/components/add-car/add-car';
import { Main } from './shared/layout/main/main';
import { CarDetails } from './shared/components/car-details/car-details';

export const routes: Routes = [
    {
        path: '',
        component: Main
    },
    {
        path: 'cars',
        component: Main
    },
    {
        path: 'car/:id',
        component: CarDetails
    }
    
];
