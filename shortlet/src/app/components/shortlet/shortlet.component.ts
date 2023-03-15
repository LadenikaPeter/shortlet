import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

import { differenceInDays } from 'date-fns';
// import {  } from '@date-fns';

@Component({
  selector: 'app-shortlet',
  templateUrl: './shortlet.component.html',
  styleUrls: ['./shortlet.component.css'],
})
export class ShortletComponent implements OnInit {
  shortletData: any = [];
  shortletPictures: any = [];
  shortletPrice: any;
  showAmenities: boolean = false;

  // dataStorage: any;

  constructor(
    private dataStorage: DataStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      let id: number = data['id'];
      this.displayShortlet(id);
    });

    this.checkinDate = new Date();
    console.log(this.checkinDate.getDate());
  }

  //to diplay hortlet
  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        // console.log(this.shortletData = response)
        this.shortletData = response;
        this.shortletPictures = response.pictures;
      },
      (error) => console.log(error)
    );
  }

  toggleAmenities() {
    this.showAmenities != this.showAmenities;
  }

  // dateSelected: any
  checkinDate: Date;
  checkoutDate: Date;

  // dateLeft: number
  // dateRight: number

  fetchDateSelected() {
    console.log('the check in date: ' + this.checkinDate);
    console.log('the check out date: ' + this.checkoutDate);
    console.log();
    // console.log()
    this.showNight();
  }

  showNight() {
    let timeDiff = Math.abs(
      new Date(this.checkoutDate).getTime() -
        new Date(this.checkinDate).getTime()
    );
    // let timeDiff = Math.abs(1200);
    let numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(numberOfNights + ' nights');
  }

  // date14: Date;
}
