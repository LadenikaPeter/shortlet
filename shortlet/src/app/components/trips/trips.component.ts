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
  image: string;
  apartmentName: string;
  location: string;
  checkindate: string;
  checkoutdate: string;
  amountpaid: number;
}

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit, AfterViewInit {
  reservations: any;
  reservationPictures: any = [];
  // displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  displayedColumns: string[] = [
    'image',
    'apartmentName',
    'location',
    'checkindate',
    'checkoutdate',
    'amountpaid',
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataS: DataStorageService) {
    this.dataS
      .getAllReservations()
      .pipe(
        map((data) => {
          // console.log(data[1].price);

          console.log(data);
          return data;
        })
      )
      .subscribe((res) => {
        // console.log(res);
      });

    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // this.dataS.getAllReservations().subscribe((res) => {
    //   console.log(res);
    //   // console.log(res.apartment.pictures);
    //   this.reservations = res;
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
