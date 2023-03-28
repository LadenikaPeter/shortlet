import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shortlet } from '../interface/shortlet';
import { NotificationService } from './notifications.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // baseURL: string = "http://localhost:8080/";

  propertyType = new BehaviorSubject(null);
  checkInDateforDB: any;
  checkOutDateforDB: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notif: NotificationService
  ) {}

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

  getSelectedApartment(property_type: string) {
    this.http
      .get(
        'http://localhost:8080/verified_homes/search/?property_type=' +
          property_type
      )
      .subscribe((res) => {
        console.log(res);
        this.propertyType.next(res);
      });
  }

  addReservation(
    id: number,
    email: string,
    checkInDate: Date,
    checkOutDate: Date,
    price: number
  ) {
    const checkin = this.dateConverterforCheckIn(checkInDate);
    const checkout = this.dateConverterforCheckOut(checkOutDate);
    // console.log(checkin, checkout);
    this.http
      .put(
        `http://localhost:8080/addReservation/?user_email=${email}&apartment_id=${id}`,
        {
          checkInDate: checkin,
          checkOutDate: checkout,
          price: price,
        }
      )
      .subscribe((res) => {
        console.log(res);
        this.notif.successMessage('Reservation Successful');
        this.router.navigate(['/trips']);
      });
  }

  getAllReservations() {
    return this.http.get('http://localhost:8080/reservation/');
  }

  private dateConverterforCheckIn(reserveDate: Date) {
    const date = new Date(reserveDate);

    const year = date.toLocaleString('default', { year: 'numeric' });

    const month = date.toLocaleString('default', { month: '2-digit' });

    const day = date.toLocaleString('default', { day: '2-digit' });

    const formattedDate1 = year + '-' + month + '-' + day;
    return formattedDate1;
  }

  private dateConverterforCheckOut(reserveDate: Date) {
    const date = new Date(reserveDate);

    const year = date.toLocaleString('default', { year: 'numeric' });

    const month = date.toLocaleString('default', { month: '2-digit' });

    const day = date.toLocaleString('default', { day: '2-digit' });

    const formattedDate2 = year + '-' + month + '-' + day;
    return formattedDate2;
  }
}
