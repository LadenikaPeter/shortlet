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
  constructor(
    private dataStorage: DataStorageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      let id: number = data['id'];
      this.displayShortlet(id);
    });
  }

  shortletData: Partial<Shortlet> = {} 
  shortletPictures: any = [];

  displayShortlet(id: number) {
    this.dataStorage.displayShortlet(id).subscribe(
      (response) => {
        this.shortletData = response;
        console.log(this.shortletPictures = response.pictures)
        // this.shortletPictures = response.pictures; //pictures of shortlet from API
      },
      (error) => console.log(error)
    );
  }
}
