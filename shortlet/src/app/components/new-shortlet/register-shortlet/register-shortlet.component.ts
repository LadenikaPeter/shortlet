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
    console.log(form.value)
    this.addNewShortlet();
  }


  addNewShortlet(){
    this.dataStorage.registerNewShortlet().subscribe(
      (response) => {
        console.log((this.newShortlet = response));
      },
      (error) => console.log(error)
    );
  }
  
  
}
