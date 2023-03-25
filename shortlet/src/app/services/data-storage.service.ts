import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shortlet } from '../interface/shortlet';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // baseURL: string = "http://localhost:8080/";
  constructor(private http: HttpClient) {}

  getShortlets() {
    return this.http.get<Shortlet>('http://localhost:8080/verified_homes');
  }
  displayShortlet(id: number): Observable<Shortlet> {
    return this.http.get<Shortlet>(
      `http://localhost:8080/home/?house_id=${id}`
    );
  }

  registerNewShortlet() {
    // return this.http.post<Shortlet>(`http://localhost:8080/addhome/`, data)
  }

  getUser() {
    return this.http.get('http://localhost:8080/');
  }

  updateUserInfo(
    userDetails: { name: string; phoneNo: number },
    email: string
  ) {
    return this.http.put('http://localhost:8080/update_user/', userDetails, {
      headers: new HttpHeaders({ user_email: email }),
    });
    // console.log(userDetails);
  }
}
