import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Observer, Subscription } from 'rxjs';
import { User } from 'src/app/Model/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

export interface ExampleTab {
  label: string;
  content: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
}

export interface RequestData {
  address: string;
  country: string;
  id: number;
  name: string;
  state: string;
}

export interface RowData {
  email: string;
  id: number;
  name: string;
  phoneNo: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit, OnDestroy {
  users: any;
  requests: any;
  username = '';
  user_email: string;
  hold_userdata: RowData;
  getAlluserSub: Subscription;
  pendingReqSub: Subscription;
  userSub: Subscription;
  asyncTabs: Observable<ExampleTab[]>;

  // any property name with 1 is for the request table
  // any request with 2 or nothing e.g dataSource is for thw users table

  displayedColumns: string[] = ['name', 'email', 'action'];
  displayedColumns1: string[] = ['name', 'country', 'action'];

  dataSource: MatTableDataSource<UserData>;
  dataSource1: MatTableDataSource<RequestData>;

  @ViewChild('paginator1') paginator1: MatPaginator;
  @ViewChild('sort1') sort1: MatSort;

  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('sort2') sort2: MatSort;

  constructor(private dataS: DataStorageService, private authS: AuthService) {}

  ngOnInit(): void {
    this.getAlluserSub = this.dataS.getAllUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator2;
      this.dataSource.sort = this.sort2;
    });

    this.userSub = this.authS.user.subscribe((user: User) => {
      this.user_email = user.email;
    });

    this.pendingReqSub = this.dataS.getAllPendingRequest().subscribe((res) => {
      console.log(res);
      this.requests = res;
      this.dataSource1 = new MatTableDataSource(this.requests);
      this.dataSource1.paginator = this.paginator1;
      this.dataSource1.sort = this.sort1;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  getDataFromAdminClick(row: RowData) {
    console.log(row);
    this.hold_userdata = row;
    this.username = row.name;
  }

  makeUserAdmin() {
    console.log(this.hold_userdata);
    this.dataS.makeUserAdmin(this.hold_userdata.id, this.user_email).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.getAlluserSub.unsubscribe();
    this.userSub.unsubscribe();
    this.pendingReqSub.unsubscribe();
  }
}
