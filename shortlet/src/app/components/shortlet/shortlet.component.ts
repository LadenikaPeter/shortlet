import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';

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
<<<<<<< HEAD

=======
  dateForCalendar: string;
  dateForCalendar2: string;
  
>>>>>>> a677c2ec7556b7389caeaa41f96130ea8d00fbaf
  constructor(
    private dataStorage: DataStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      let id: number = data['id'];
      this.displayShortlet(id);
    });

<<<<<<< HEAD
    this.checkinDate = new Date();
    this.noSelectFromPast();
    this.noSelectLessThan2();

    let newCheckoutDate = (this.checkoutDate = new Date());
    newCheckoutDate.setDate(new Date().getDate() + 2); // 2 days to the default checkin and out date
=======
    this.checkinDate = new Date()
    this.noSelectFromPast();
    this.noSelectLessThan2();
    
    let newCheckoutDate = this.checkoutDate = new Date()
    newCheckoutDate.setDate(new Date().getDate() + 2) // 2 days to the default checkin and out date
>>>>>>> a677c2ec7556b7389caeaa41f96130ea8d00fbaf

    
    this.fetchDateSelected();
  }

  //to diplay hortlet
  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        console.log((this.shortletData = response));
        this.shortletData = response;
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

  fetchDateSelected() {
    let timeDiff = Math.abs(
      new Date(this.checkoutDate).getTime() -
        new Date(this.checkinDate).getTime()
    );
    this.numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.calculateBill();
  }

  //reservation bill
  calculateNumberOfNights: number;
  total: number;

<<<<<<< HEAD
  calculateBill() {
    // console.log(this.shortletPrice)
=======
  calculateBill() {    
    this.calculateNumberOfNights = this.shortletData.price *  this.numberOfNights    
    this.total = this.calculateNumberOfNights + 107 + 231;
  }
>>>>>>> a677c2ec7556b7389caeaa41f96130ea8d00fbaf

    this.calculateNumberOfNights =
      this.shortletData.price * this.numberOfNights;

<<<<<<< HEAD
    this.total = this.calculateNumberOfNights + 107 + 231;
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
=======

  today:Date
  mindate(){
    this.today = new Date()
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

>>>>>>> a677c2ec7556b7389caeaa41f96130ea8d00fbaf
}
