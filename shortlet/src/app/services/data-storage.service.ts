import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Shortlet } from '../Model/shortlet.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  getShortlets() {
    return this.http.get<Shortlet>('http://localhost:8080/verified_homes');
  }
}
