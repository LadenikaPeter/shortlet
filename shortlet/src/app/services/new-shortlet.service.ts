import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewShortlet, Listings } from '../interface/shortlet';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewShortletService {
  getListingData = new Subject();
  constructor(private http: HttpClient) {}
  registerNewShortlet(formData, email) {
    // const email = '';

    const options = {
      headers: {
        user_email: email,
      },
    };

    console.log(formData);

    return this.http.post<NewShortlet>(
      environment.endpoint + `/addHome/`,
      formData,
      options
    );
  }

  getListing(email) {
    const options = {
      headers: {
        user_email: email,
      },
    };

    return this.http.get<Listings>(
      environment.endpoint + `/user/listings/`,
      options
    );
  }

  DeleteListing(id: number, email: string) {
    return this.http.delete(
      `http://localhost:8080/apartment/delete/?apartment_id=${id}`,
      {
        headers: new HttpHeaders({ user_email: email }),
        responseType: 'text',
      }
    );
  }

  getCountry() {
    return this.http.get<any[]>('https://restcountries.com/v2/all');
  }

  getAllHouseTypes() {
    return this.http.get<any[]>(environment.endpoint + '/house_type');
  }

  getAllPropertyTypes() {
    return this.http.get<any[]>(environment.endpoint + '/property_type');
  }
}
