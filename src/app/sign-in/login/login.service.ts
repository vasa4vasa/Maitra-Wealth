import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
 export class LoginService{

    private baseUrl = 'http://localhost:8888/api';

    constructor(private http: HttpClient){}

        login(UserEmail: string,Password: string): Observable <any>{
            return this.http.post(`${this.baseUrl}/login`,{ UserEmail: UserEmail, Password: Password }).pipe(
                tap((response: any) => {
                    if (response && response.token) {
                        localStorage.setItem('token', response.token);
                        console.log('Token stored in localStorage:', response.token);
                    } else {
                        console.error('Token not found in response:', response);
                    }
                })
            );
        }
}