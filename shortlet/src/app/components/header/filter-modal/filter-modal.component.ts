import { Component, OnInit } from '@angular/core';
import { NewShortletService } from 'src/app/services/new-shortlet.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent implements OnInit {
  countries: any[] = [];

  counter_maxguests: number = 1;
  counter_bedrooms: number = 1;
  counter_beds: number = 1;
  max_num = 15;

  min_price = 0;
  max_price = 100;
  thumbLabel = true;
  value_min_price = 0;
  value_max_price = 100;
  selectedCountry: any;

  constructor(private newshortletS: NewShortletService) {}

  ngOnInit(): void {
    this.newshortletS.getCountry().subscribe((response) => {
      this.countries = response.map((country) => {
        return { name: country.name, code: country.alpha2Code };
      });
      // console.log(this.countries);
    });
  }

  increment(id: any) {
    switch (id) {
      case 'guest':
        if (this.counter_maxguests < this.max_num) {
          this.counter_maxguests = this.counter_maxguests + 1;
        }
        break;

      case 'bedrooms':
        if (this.counter_bedrooms < this.max_num) {
          this.counter_bedrooms = this.counter_bedrooms + 1;
        }
        break;

      case 'beds':
        if (this.counter_beds < this.max_num) {
          this.counter_beds = this.counter_beds + 1;
        }
        break;

      default:
        break;
    }
  }

  decrement(id: any) {
    switch (id) {
      case 'guest':
        if (this.counter_maxguests > 1) {
          this.counter_maxguests = this.counter_maxguests - 1;
        }
        break;

      case 'bedrooms':
        if (this.counter_bedrooms > 1) {
          this.counter_bedrooms = this.counter_bedrooms - 1;
        }
        break;

      case 'beds':
        if (this.counter_beds > 1) {
          this.counter_beds = this.counter_beds - 1;
        }
        break;

      default:
        break;
    }
  }
}
