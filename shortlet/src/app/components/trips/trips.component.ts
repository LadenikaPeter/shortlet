import { Component, OnInit } from '@angular/core';
import * as fromReservation from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  reservations: any;
  reservationPictures: any = [];
  constructor(private dataS: DataStorageService) {}
  ngOnInit(): void {
    this.dataS.getAllReservations().subscribe((res) => {
      console.log(res);

      // console.log(res.apartment.pictures);
      this.reservations = res;
    });
  }
}
