import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
})
export class FilterBarComponent {
  filterbar: { name: string; image: string }[] = [
    {
      name: 'APARTMENT',
      image: '../../../../assets/property/apatment.jpg',
    },
    {
      name: 'GUESTHOUSE',
      image: '../../../../assets/property/guest-house.jpg',
    },
    {
      name: 'BED_AND_BREAKFAST',
      image: '../../../../assets/property/bed-breakfast.jpg',
    },
    {
      name: 'TINY_HOME',
      image: '../../../../assets/property/tiny-home.jpg',
    },
    {
      name: 'CASTLE',
      image: '../../../../assets/property/castles.jpg',
    },
    {
      name: 'HOTEL',
      image: '../../../../assets/property/hotel.jpg',
    },
    {
      name: 'TENT',
      image: '../../../../assets/property/tent.jpg',
    },
    {
      name: 'TREEHOUSE',
      image: '../../../../assets/property/tree-house.jpg',
    },
  ];
}
