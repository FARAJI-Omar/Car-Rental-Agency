import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CarService } from '../../../core/services/car.service'; 
import { Brand } from '../../../core/models/brand';
import { forkJoin } from 'rxjs';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar, Footer],
  templateUrl: './car-details.html'
})
export class CarDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private carService = inject(CarService);

  loading = signal(true);
  car = signal<any | null>(null);

 ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading.set(true);

    forkJoin({
      carData: this.carService.getCarById(id),
      brands: this.carService.getBrands()
    }).subscribe({
      next: ({ carData, brands }) => {
        // FIX: Force both to Number to ensure the match works
        const foundBrand = brands.find(b => Number(b.id) === Number(carData.brand_id));

        this.car.set({
          ...carData,
          brandName: foundBrand ? foundBrand.title : 'Premium Brand'
        });
        
        this.loading.set(false);
      },
      error: () => {
        this.car.set(null);
        this.loading.set(false);
      }
    });
  }
}