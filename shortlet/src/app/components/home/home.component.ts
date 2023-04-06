import { Component, OnInit } from '@angular/core';
import { Shortlet } from 'src/app/Model/shortlet.model';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  availableShortlets: any = [];

  constructor(private dataStorage: DataStorageService) {}
  ngOnInit(): void {
    this.dataStorage.getShortlets().subscribe((shortlet) => {
      this.availableShortlets = shortlet;
      console.log(this.availableShortlets);
    });

    this.dataStorage.propertyType.subscribe((selectedProperty) => {
      if (selectedProperty) {
        this.availableShortlets = selectedProperty;
      }
    });

    this.dataStorage.returnAllHomes.subscribe((all_shortlets) => {
      this.availableShortlets = all_shortlets;
    });
    console.log('WORKING!');
  }

  print(string, id) {
    console.log(string + id);
  }
}
