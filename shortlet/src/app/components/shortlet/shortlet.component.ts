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

  buttonDisable: boolean;

  // testArray = [{ checkin: '2023-03-23', checkout: '2023-03-25' }];
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
    console.log(this.myHolidayDates);
    this.myHolidayDates;

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
        this.disableReserveDate();
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

  dateConverter(dateOBJ: Date) {
    const date = new Date(dateOBJ);

    const year = date.toLocaleString('default', { year: 'numeric' });

    const month = date.toLocaleString('default', { month: '2-digit' });

    const day = date.toLocaleString('default', { day: '2-digit' });

    const formattedDate = month + '/' + day + '/' + year;

    return formattedDate;
    // this.dateForCalendar = formattedDate;

    // console.log(formattedDate);

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
      this.mynewArray.push(new Date(date1));
      // this.myHolidayDates.push(new Date(this.dateConverter(date1)));
    }

    console.log(this.myHolidayDates);
    console.log(this.mynewArray);
  }

  myHolidayDates = [
    // new Date('3/28/2023'),
    // new Date('3/29/2023'),
    // new Date('3/30/2023'),
  ];

  disableReserveDate() {
    //this will disable reserve date if both the current day and two days ahead are already reserved
    const checkIn = this.dateConverter(this.checkinDate);
    const checkOut = this.dateConverter(this.minDateForCheckOut);
    console.log(checkIn);
    console.log(checkOut);
    console.log(this.myHolidayDates);
    // const testArray: Array<Date> = [...this.myHolidayDates];

    for (let date of this.mynewArray) {
      const newDate = this.dateConverter(date);
      console.log(newDate);
      if (
        new Date(newDate).getTime() === new Date(checkIn).getTime() ||
        new Date(newDate).getTime() === new Date(checkOut).getTime()
      ) {
        console.log(true);
        this.buttonDisable = true;
      } else {
        console.log(false);
      }
    }
  }

  myHolidayFilter = (d: Date): boolean => {
    const time = d.getTime();
    return !this.myHolidayDates.find((x) => x.getTime() == time);
  };

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
