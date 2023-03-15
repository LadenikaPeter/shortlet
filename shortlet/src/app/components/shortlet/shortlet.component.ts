import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-shortlet',
  templateUrl: './shortlet.component.html',
  styleUrls: ['./shortlet.component.css'],
})
export class ShortletComponent implements OnInit {
  checkinDate: Date 
  checkoutDate: Date
  numberOfNights: number
  shortletData: any= []
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
      this.displayShortlet(id);
    });


    this.checkinDate = new Date()
    
    let newCheckoutDate = this.checkoutDate = new Date()
    newCheckoutDate.setDate(new Date().getDate() + 2) // 2 days to the default checkin and out date

    this.fetchDateSelected();
  }

  

  //to diplay hortlet
  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        console.log(this.shortletData = response)
        this.shortletData = response; //details of shortlet from API
        this.shortletPictures = response.pictures; //pictures of shortlet from API
      },
      (error) => console.log(error)
    );
  }

  toggleAmenities(){
    this.showAmenities != this.showAmenities; 
  }
  fetchDateSelected() {
    
    
    let timeDiff = Math.abs(new Date(this.checkoutDate).getTime() - new Date(this.checkinDate).getTime())
    this.numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    console.log(this.numberOfNights)

    this.bill();
  }

  //reservation bill
  calculateNumberOfNights: number
  total: number

  bill() {
    console.log(this.numberOfNights)
    console.log(this.calculateNumberOfNights)


    console.log(this.shortletData.price)
    
    this.calculateNumberOfNights = (this.shortletData.price *  this.numberOfNights)
    
    
    this.total = this.calculateNumberOfNights + 107 + 231;
  }
}
