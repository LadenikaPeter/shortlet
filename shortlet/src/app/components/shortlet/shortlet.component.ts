import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

import { differenceInDays} from 'date-fns';
// import {  } from '@date-fns';

@Component({
  selector: 'app-shortlet',
  templateUrl: './shortlet.component.html',
  styleUrls: ['./shortlet.component.css'],
})
export class ShortletComponent implements OnInit {
  shortletData: any= []
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

    console.log('e dey work');
  }

  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        // console.log(this.shortletData = response)
        this.shortletData = response;
      },
      (error) => console.log(error)
    );
  }

  toggleAmenities(){
    this.showAmenities != this.showAmenities; 
  }

  // dateSelected: any
  checkinDate: number
  checkoutDate: number

  // dateLeft: number
  // dateRight: number

  fetchDateSelected() {
    console.log("the check in date: " + this.checkinDate);
    console.log("the check out date: " + this.checkoutDate);  
    console.log(differenceInDays(new Date(2023, 5, 1), new Date(2023, 2, 1)));
  }

  showNight(){
    // console.log(differenceInDays(this.checkinDate, this.checkoutDate));
  }
  
  // date14: Date;



}
