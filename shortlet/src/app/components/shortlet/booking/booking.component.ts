import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Shortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  checkin: Date
  checkout: Date
  nights: number
  calculateNumberOfNights: number;
  total: number;

  constructor(
    private dataStorage: DataStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data)
      let id: number = data['id'];
      this.displayShortlet(id);
    });

    this.checkin = this.activatedRoute.snapshot.queryParams['checkin'];
    this.checkout = this.activatedRoute.snapshot.queryParams['checkout'];
    this.nights = this.activatedRoute.snapshot.queryParams['nights'];

    this.calculateBill();
  }

  shortletData: Partial<Shortlet> = {} 
  shortletPictures: any = [];

  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        this.shortletData = response;
        this.calculateBill();
        console.log(this.shortletPictures = response.pictures)
        // this.shortletPictures = response.pictures; //pictures of shortlet from API
      },
      (error) => console.log(error)
    );
  }


  calculateBill() {    
    this.calculateNumberOfNights = this.shortletData.price *  this.nights    
    this.total = this.calculateNumberOfNights + 107 + 231;
  }
}
