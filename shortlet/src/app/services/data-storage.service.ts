import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shortlet } from '../interface/shortlet';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  getShortlets() {
    return this.http.get<Shortlet>('http://localhost:8080/verified_homes');    
  }
  displayShortlet(id:number): Observable<Shortlet>{
    return this.http.get<Shortlet>(`http://localhost:8080/home/?house_id=${id}`);
  }
}
