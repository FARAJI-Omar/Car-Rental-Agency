import { Component, inject } from '@angular/core';
import { AddCar } from '../../components/add-car/add-car';
import { CarsList } from '../../components/cars-list/cars-list';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';
import { SideBar } from "../../components/side-bar/side-bar";
import { Store } from '@ngrx/store';
import { CarActions } from '../../../store/cars/cars.actions';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AddCar, CarsList, Navbar, Footer, SideBar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  private store = inject(Store);
  showAddCar = this.store.selectSignal(state => state.cars.showAddForm);

 openForm() {
    this.store.dispatch(CarActions.toggleAddForm({ show: true }));
  }
}