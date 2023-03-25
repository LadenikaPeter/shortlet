import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shortlet } from '../interface/shortlet';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  // baseURL: string = "http://localhost:8080/";
  constructor(private http: HttpClient) {}

  // const headers = new HttpHeaders()
  // .set('Authorization', 'Bearer your-access-token')
  // .set('Content-Type', 'application/json');

  getShortlets() {
    return this.http.get<Shortlet>('http://localhost:8080/verified_homes');
  }
  displayShortlet(id:number): Observable<Shortlet>{
    return this.http.get<Shortlet>(`http://localhost:8080/home/?house_id=${id}`);
  }

  registerNewShortlet(){
    // const email = '';
    
    const options = {
      headers: {
        'user_email': 'sami@gmail.com'
      }
    };




    const formData = {
      name: 'John Doe',
      email: 'sami@gmail.com',
      description: 'Hello world!'
    };


    return this.http.post<Shortlet>(`http://localhost:8080/addHome/`, formData, options)
  }
}
