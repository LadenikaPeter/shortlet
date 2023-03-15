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
  showAmenities: boolean = false;

  // dataStorage: any;

  constructor(
    private dataStorage: DataStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      let id: number = data['id'];

      console.log(id);
      this.displayShortlet(id);
    });
    this.forCalendar();
    // this.dateForCalendar = new Date(Date.now()).toLocaleString();
    this.checkinDate = new Date();
    console.log(this.checkinDate.getDate());

    // console.log(new Date(Date.now()).toLocaleString());
  }

  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        // console.log(this.shortletData = response)
        console.log(response.price);
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
  dateForCalendar: string;

  forCalendar() {
    // Create a date object from a date string
    const date = new Date();

    // Get year, month, and day part from the date
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    const formattedDate = year + '-' + month + '-' + day;
    this.dateForCalendar = formattedDate;
    console.log(formattedDate); // Prints: 2022-05-04
  }

  calendarTest(event: Event) {
    console.log(event);
  }

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
