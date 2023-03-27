import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NewShortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-register-shortlet',
  templateUrl: './register-shortlet.component.html',
  styleUrls: ['./register-shortlet.component.css']
})
export class RegisterShortletComponent {

  constructor(private dataStorage: DataStorageService,){}

  userEmail
  form: NewShortlet

  newShortlet: Partial<NewShortlet> = {};

  onSubmit(form: NgForm){
    this.form = form.value
    let formData = form.value
    console.log(formData)
    // this.addNewShortlet(formData);



    this.dataStorage.registerNewShortlet(formData).subscribe(
      (response) => {
        console.log((this.newShortlet = response));
      },
      (error) => console.log(error)
    );
  }


  // addNewShortlet(formData){
    
  // }
  
  
}
