import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { AuthRequest , User , LoginResponseDto } from "../models/user.model";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'  
})
export class AuthService {

    private http = inject(HttpClient);
    private baseUrl = "https://dummyjson.com/auth";

   

    login(authRequest: AuthRequest) : Observable<{user : User}> {

        return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`,authRequest)
        .pipe(
            map((response) => ({
                user : {
                    id: response.id,
                    name : response.username,
                    email: response.email,
                    accessToken : response.accessToken,
                    refreshToken : response.refreshToken
                }
            }) )
        );
    }






}