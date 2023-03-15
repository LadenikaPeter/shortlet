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

    this.checkinDate = new Date()
    console.log(this.checkinDate.getDate())
    
  }

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
<<<<<<< HEAD
  checkinDate: Date;
  checkoutDate: Date;
=======
  checkinDate: Date 
  checkoutDate: Date
>>>>>>> ea41d1a4ab5f9d008e6abe5e80be67427cdeb28e

  // dateLeft: number
  // dateRight: number

  fetchDateSelected() {
<<<<<<< HEAD
    // console.log("the check in date: " + this.checkinDate);
    // console.log("the check out date: " + this.checkoutDate);
    // console.log(differenceInDays(new Date(2023, 5, 1), new Date(2023, 2, 1)));
    // console.log(new Date(this.checkinDate.getTime()));
  }

  showNight() {
    // console.log(differenceInDays(this.checkinDate, this.checkoutDate));
=======
    console.log("the check in date: " + this.checkinDate);
    console.log("the check out date: " + this.checkoutDate);
    console.log()
    // console.log()
    this.showNight();
  }

  showNight(){
    let timeDiff = Math.abs(new Date(this.checkoutDate).getTime() - new Date(this.checkinDate).getTime())
    // let timeDiff = Math.abs(1200);
    let numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log(numberOfNights + " nights");
>>>>>>> ea41d1a4ab5f9d008e6abe5e80be67427cdeb28e
  }

  // date14: Date;
}
