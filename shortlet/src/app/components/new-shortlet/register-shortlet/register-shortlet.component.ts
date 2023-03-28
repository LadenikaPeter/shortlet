import { Component } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NewShortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-register-shortlet',
  templateUrl: './register-shortlet.component.html',
  styleUrls: ['./register-shortlet.component.css']
})
export class RegisterShortletComponent {
  newShortlet: NewShortlet;

  constructor(private dataStorage: DataStorageService,){}


  myForm: FormGroup;

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      price: new FormControl(''),
      maxNoOfGuests: new FormControl(''),
      noOfBedrooms: new FormControl(''),
      noOfBathrooms: new FormControl(''),
      propertyType: new FormControl(""),
      houseType: new FormControl(""),
      amenities: new FormGroup({
        gym: new FormControl(false),
        pool: new FormControl(false),
        wifi: new FormControl(false),
        patio: new FormControl(false),
        washer: new FormControl(false),
      })
  }); 
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log(form.value)


    // this.form = form.value
    let formData = form.value
    console.log(formData)
    // this.addNewShortlet(formData);



    this.dataStorage.registerNewShortlet(formData).subscribe(
      (response) => {
        console.log((this.newShortlet = response));
      },
      (error) => console.log(error)
    );

    // formData.amenities = this.newShortlet.amenities;
    // console.log(formData);
  }
  

}
