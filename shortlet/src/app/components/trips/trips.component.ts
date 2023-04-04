import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import * as fromReservation from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';

// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   fruit: string;
// }

export interface UserData {
  apartmentPicture: string;
  apartmentId: number;
  apartmentName: string;
  apartmentCountry: string;
  apartmentState: string;
  checkInDate: Date;
  checkOutDate: Date;
  price: number;
  id: number;
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent {
  reservations: any;
  // reservationPictures: any = [];
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  displayedColumns: string[] = [
    'apartmentPicture',
    'apartmentCountry',
    'apartmentName',
    'checkInDate',
    'checkOutDate',
    'price',
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataS: DataStorageService) {
    this.dataS.getAllReservations().subscribe((res) => {
      console.log(res);
      this.reservations = res;
      this.dataSource = new MatTableDataSource(this.reservations);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
