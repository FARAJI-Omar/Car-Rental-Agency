import { Car } from "../../core/models/car";

export interface CarState {
    cars: Car[];
    filters: {
        brandId: number | null;
        availableOnly: boolean;
        soldOnly: boolean;
    };
    loading: boolean;
    error: string | null;
}

export const initialCarState: CarState = {
    cars: [],
    filters: { brandId: null, availableOnly: false, soldOnly: false },
    loading: false,
    error: null
};