import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  apiUrl = "http://localhost:8888/api/allusers";

  constructor(private http: HttpClient) {
    this.getAllusers();
  }

  getAllusers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
