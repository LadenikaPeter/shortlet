import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  constructor(private dataS: DataStorageService) {}
  ngOnInit(): void {
    this.dataS.getAllReservations().subscribe((res) => {
      console.log(res);
    });
  }
}
