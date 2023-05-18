import { Component, OnInit } from '@angular/core';
import { NewShortletService } from 'src/app/services/new-shortlet.service';

@Component({
  selector: 'app-view-listing',
  templateUrl: './view-listing.component.html',
  styleUrls: ['./view-listing.component.css'],
})
export class ViewListingComponent implements OnInit {
  userData: any = {};
  constructor(private newshortletS: NewShortletService) {}

  ngOnInit(): void {
    this.newshortletS.getListingData.subscribe((res) => {
      // console.log(res);
      this.userData = res;
    });
  }
}
