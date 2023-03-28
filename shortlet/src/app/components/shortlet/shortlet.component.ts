import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shortlet',
  templateUrl: './shortlet.component.html',
  styleUrls: ['./shortlet.component.css'],
})
export class ShortletComponent implements OnInit {
  checkinDate: Date;
  checkoutDate: Date;
  dateForCalendar: string;
  dateForCalendar2: string;
  numberOfNights: number;
  shortletData: Partial<Shortlet> = {};
  shortletPictures: any = [];
  shortletPrice: any;
  showAmenities: boolean = false;
  maxNoOfGuests: number;
  counter: number = 1;
  // reservedDates: any = []

  testArray = [{ checkin: '2023-03-23', checkout: '2023-03-25' }];
  mynewArray = [];
  overallArray = [];

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
    this.noSelectFromPast();
    this.noSelectLessThan2();

    let newCheckoutDate = (this.checkoutDate = new Date());
    newCheckoutDate.setDate(new Date().getDate() + 2); // 2 days to the default checkin and out date

    console.log(this.checkinDate);
    this.fetchDateSelected();
    // this.mytest();
    // this.logicToDisableDate();
    // this.checkdateInbetween();
  }
  

  //to diplay hortlet
  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        console.log((this.shortletData = response));
        this.shortletData = response;
        this.overallArray = response.reservations;
        this.maxNoOfGuests = response.maxNoOfGuests;
        // console.log(this.overallArray);
        for (let reserve of this.overallArray) {
          this.checkdateInbetween(reserve.checkInDate, reserve.checkOutDate);
        }

        this.calculateBill(); //details of shortlet from API
        // console.log(this.shortletPrice = response.price)
        this.shortletPictures = response.pictures; //pictures of shortlet from API
      },
      (error) => console.log(error)
    );
  }

  toggleAmenities() {
    this.showAmenities != this.showAmenities;
  }


  trialM(e){
    this.fetchDateSelected();
  }

  fetchDateSelected() {

    console.log("enter")
    let timeDiff = Math.abs(this.minDateForCheckOut.getTime() - this.checkinDate.getTime());
    this.numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(this.numberOfNights);
    this.calculateBill();
  }

  //reservation bill
  calculateNumberOfNights: number;
  total: number;

  calculateBill() {
    this.calculateNumberOfNights =
      this.shortletData.price * this.numberOfNights;
    this.total = this.calculateNumberOfNights + 107 + 231;
  }

  today: Date;
  mindate() {
    this.today = new Date();
  }

  noSelectFromPast() {
    const date = new Date();

    const year = date.toLocaleString('default', { year: 'numeric' });

    const month = date.toLocaleString('default', { month: '2-digit' });

    const day = date.toLocaleString('default', { day: '2-digit' });

    const formattedDate = year + '-' + month + '-' + day;

    this.dateForCalendar = formattedDate;

    // console.log(formattedDate); // Prints: 2022-05-04
  }

  noSelectLessThan2() {
    let newDate = new Date();

    newDate.setDate(new Date().getDate() + 2); // 2 days to the default checkin and out date

    const year = newDate.toLocaleString('default', { year: 'numeric' });

    const month = newDate.toLocaleString('default', { month: '2-digit' });

    const day = newDate.toLocaleString('default', { day: '2-digit' });

    const formattedDate = year + '-' + month + '-' + day;

    this.dateForCalendar2 = formattedDate;

    console.log(formattedDate);
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  // myDateFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   return day !== 0 && day !== 6;
  // };

  dateConverter() {
    const date = new Date('2023-03-23');

    const year = date.toLocaleString('default', { year: 'numeric' });

    const month = date.toLocaleString('default', { month: '2-digit' });

    const day = date.toLocaleString('default', { day: '2-digit' });

    const formattedDate = month + '-' + day + '-' + year;

    // this.dateForCalendar = formattedDate;

    console.log(formattedDate);

    // console.log(formattedDate); // Prints: 2022-05-04
  }

  checkdateInbetween(checkInDate, checkOutDate) {
    // console.log(new Date('2023-03-20'));
    // let testCheck1 = new Date('2023-03-20');
    // let testCheck2 = new Date('2023-03-22');

    let testCheck1 = new Date(checkInDate);
    let testCheck2 = new Date(checkOutDate);

    const date = new Date(testCheck1.getTime());

    const dates = [];

    while (date <= testCheck2) {
      dates.push(new Date(date).toLocaleDateString());
      date.setDate(date.getDate() + 1);
    }

    console.log(dates);

    for (let date1 of dates) {
      this.myHolidayDates.push(new Date(date1));
    }

    console.log(this.myHolidayDates);

    // if (testCheck1.getTime() === testCheck2.getTime()) {
    //   console.log('true');
    // } else {
    //   console.log('false');
    // }
    // console.log(dates);

    // for (let date1 of dates) {
    //   // console.log(date1);
    //   if (new Date(date1).getTime() === testCheck2.getTime()) {
    //     console.log('not available');
    //   }
    // }
  }

  myHolidayDates = [
    // new Date('12/1/2020'),
    // new Date('12/20/2020'),
    // new Date('12/17/2020'),
    // new Date('12/25/2020'),
    // new Date('12/4/2020'),
    // new Date('12/7/2020'),
    // new Date('12/12/2020'),
    // new Date('12/11/2020'),
    // new Date('12/26/2020'),
    // new Date('12/25/2020'),
    // new Date('03-23-2023'),
    // new Date('03-25-2023'),
  ];

  myHolidayFilter = (d: Date): boolean => {
    const time = d.getTime();
    return !this.myHolidayDates.find((x) => x.getTime() == time);
  };

  logicToDisableDate() {
    for (let reserve of this.testArray) {
      // this.mynewArray.push(reserve.checkin, reserve.checkout);
      // this.checkdateInbetween(reserve.checkin, reserve.checkout);
    }
    console.log('from my new array' + this.mynewArray);
  }

  minDate = new Date();
  trial = new Date();
  twodayAhead = this.trial.setDate(this.trial.getDate() + 2);
  minDateForCheckOut = new Date(this.twodayAhead);

  increment() {
    if (this.counter < this.maxNoOfGuests) {
      this.counter = this.counter + 1;
    }
    return false;
  }

  decrement() {
    if (this.counter > 1) {
      this.counter = this.counter - 1;
    }
  }
}
