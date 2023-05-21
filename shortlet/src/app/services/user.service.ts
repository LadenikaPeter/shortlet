import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUser() {
    // console.log(token);
    return this.http.get(environment.endpoint + '/');
  }

  updateUserInfo(
    userDetails: { name: string; phoneNo: number },
    email: string
  ) {
    return this.http.put(environment.endpoint + '/update_user/', userDetails);
    // console.log(userDetails);
  }
}
