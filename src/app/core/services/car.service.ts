import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Brand } from '../models/brand';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
    private http = inject(HttpClient);
    private url = 'http://localhost:3000/cars'; 
    private brandsUrl = 'http://localhost:3000/brands';

    getCars() {
        return this.http.get<Car[]>(this.url);
    }

    deleteCar(id: number) {
        return this.http.delete(`${this.url}/${id}`);
    }

    addCar(car: Car) {
        return this.http.post<Car>(this.url, car);
    }

    updateCar(car: Car) {
        return this.http.put<Car>(`${this.url}/${car.id}`, car);
    }

    getCarById(id: number) {
        return this.http.get<Car>(`${this.url}/${id}`);
    }

    getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.brandsUrl);
  }
}
