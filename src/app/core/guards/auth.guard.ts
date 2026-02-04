import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "../../store/auth/auth.selectors";
import { map } from "rxjs";

export const authGuard : CanActivateFn = (route ,state) => {
    const router = inject(Router);
    const store = inject(Store);

    return store.select(selectIsAuthenticated).pipe(
        map(isAuthenticated => {
            if(isAuthenticated){
                return true;
            }else {
                router.navigate(['/login']);
                return false;
            }
            
        }))
};