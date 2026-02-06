import { Routes } from '@angular/router';
import { CarsList } from './shared/components/cars-list/cars-list';
import { AddCar } from './shared/components/add-car/add-car';
import { Main } from './shared/layout/main/main';
import { CarDetails } from './shared/components/car-details/car-details';
import { Home } from './shared/layout/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'cars',
        loadComponent() {
            return import('./shared/layout/main/main').then(m => m.Main);
        },
    },
    {
        path: 'car/:id',
        component: CarDetails
    }
    
];
