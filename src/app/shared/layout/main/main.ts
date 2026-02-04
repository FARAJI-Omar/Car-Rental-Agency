import { Component, inject } from '@angular/core';
import { AddCar } from '../../components/add-car/add-car';
import { CarsList } from '../../components/cars-list/cars-list';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Footer } from '../../../shared/components/footer/footer';
import { SideBar } from '../../components/side-bar/side-bar';
import { Store } from '@ngrx/store';
import { CarActions } from '../../../store/cars/cars.actions';
import { selectIsAuthenticated, selectUserName } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AddCar, CarsList, Navbar, Footer, SideBar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {
  private store = inject(Store);
  showAddCar = this.store.selectSignal((state) => state.cars.showAddForm);
  authenticated = this.store.selectSignal(selectIsAuthenticated);
  username  = this.store.selectSignal(selectUserName);

  // authTest = selectIsAuthenticated(this.store);
  // authtestObse = this.store.select(selectIsAuthenticated);

  openForm() {
    this.store.dispatch(CarActions.toggleAddForm({ show: true }));
  }
}
