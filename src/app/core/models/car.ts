export interface Car {
  id: number;
  brand_id: number; 
  model: string;
  price: number;
  fuel: 'diesel' | 'essence' | 'electrique';
  image: string;
  availability: boolean;
  saleDate: string;
}