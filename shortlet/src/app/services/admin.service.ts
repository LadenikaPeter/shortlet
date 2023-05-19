import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get(environment.endpoint + '/staff');
  }

  getAllAdmins() {
    return this.http.get(environment.endpoint + '/admin');
  }

  makeUserAdmin(id: number, email: string, token: string) {
    return this.http.put(
      environment.endpoint + `/user/update/?user_id=${id}`,
      {},
      {
        headers: new HttpHeaders({ Authorization: token }),
      }
    );
    // console.log(id);
  }

  revokeAdminAccess(id: number, email: string, token: string) {
    return this.http.put(
      environment.endpoint + `/user/update/role/?user_id=${id}`,
      {},
      {
        headers: new HttpHeaders({ Authorization: token }),
      }
    );
  }

  getAllPendingRequest(token: string) {
    return this.http.get(environment.endpoint + '/homes/PENDING?', {
      headers: new HttpHeaders({ Authorization: token }),
    });
  }

  rejectListing(id: number, email: string, token: string) {
    // console.log(id);
    return this.http.put(
      environment.endpoint + `/home/update/unverify?apartment_id=${id}`,
      {},
      {
        headers: new HttpHeaders({ Authorization: token }),
      }
    );
  }

  acceptListing(id: number, email: string, token: string) {
    return this.http.put(
      environment.endpoint + `/home/update/verify?apartment_id=${id}`,
      {},
      {
        headers: new HttpHeaders({ Authorization: token }),
      }
    );
  }
}
