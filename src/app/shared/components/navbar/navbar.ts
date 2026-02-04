import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [RouterLink],
})
export class Navbar {
  private readonly store = inject(Store);

  authenticated = input<boolean>(false);
  username = input<string | null>(null);

  onLogout() {
    this.store.dispatch(logout());
  }
}
