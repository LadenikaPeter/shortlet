import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NewShortlet, Shortlet } from '../interface/shortlet';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  // baseURL: string = "http://localhost:8080/";

  propertyType = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  // const headers = new HttpHeaders()
  // .set('Authorization', 'Bearer your-access-token')
  // .set('Content-Type', 'application/json');

  getShortlets() {
    return this.http.get<Shortlet>('http://localhost:8080/verified_homes');
  }
  displayShortlet(id: number): Observable<Shortlet> {
    return this.http.get<Shortlet>(
      `http://localhost:8080/home/?house_id=${id}`
    );
  }

  registerNewShortlet(formData){
    // const email = '';
    
    const options = {
      headers: {
        'user_email': 'sami@gmail.com'
      }
    };

    // const formData = {
    //   name: 'John Doe',
    //   description: 'a townhall different from balablu',
    //   address :"Lagos,Nigeria",
    //   price:2000,
    //   rating:4.3,
    //   maxNoOfGuests:50,
    //   noOfBedrooms:80,
    //   noOfBathrooms:40,
    //   propertyType:"HOTEL",
    //   houseType:"PRIVATE_ROOM",
    //   pictures:["leaf village","naruto","bleach"],
    //   // amenities:{
    //   //     wifi:"true"
    //   // }
    // };


    return this.http.post<NewShortlet>(`http://localhost:8080/addHome/`, formData, options)
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
}
