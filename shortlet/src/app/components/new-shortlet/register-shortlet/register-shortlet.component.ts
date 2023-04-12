import { Component } from '@angular/core';
import { User } from 'src/app/Model/user.model';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';

import { NewShortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-shortlet',
  templateUrl: './register-shortlet.component.html',
  styleUrls: ['./register-shortlet.component.css']
})
export class RegisterShortletComponent {
  step: any = 1;
  newShortlet: NewShortlet;
  imagePreview: any;
  savedFormData: any;

  username: string;
  user_email: string;

  myForm: FormGroup;
  pictures: File

  constructor(
    // private sanitizer: DomSanitizer,
    private dataStorage: DataStorageService,
    private authS: AuthService,
    private notification: NotificationService,
    private router: Router,
  ){}


  ngOnInit() {

    //reactive form
    this.myForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl(''),
      price: new FormControl(''),
      maxNoOfGuests: new FormControl(''),
      noOfBedrooms: new FormControl(),
      noOfBathrooms: new FormControl(),
      propertyType: new FormControl(''),
      houseType: new FormControl(''),
      amenities: new FormGroup({
        gym: new FormControl(false),
        pool: new FormControl(false),
        wifi: new FormControl(false),
        patio: new FormControl(false),
        washer: new FormControl(false),
        airCondition: new FormControl(false)
      }),
      pictures: new FormArray([])
    });

    //google user info displays
    this.authS.user.subscribe((user: User) => {
      if (user) {
        this.username = user.displayName;
        this.user_email = user.email;
        // console.log(this.username);
      }
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    // this.notification.successMessage("you have added home, support will verify you home in a few minutes");

    ///timeout function that redirects back to the /host/shortlets of the new homes after a user successfully submits the form
    // setTimeout(()=>{
    //   this.router.navigate(['/host/shortlets']);
    // }, 3000)

    let formData = form.value
    // formData.append('image', this.pictures);

    //api service called 
    this.dataStorage.registerNewShortlet(formData, this.user_email).subscribe(
      (response) => {
        console.log((this.newShortlet = response));
        // function to return all users, show error if usernot registered to be implemented
      },
      (error) => console.log(error)
    )


    

    console.log(this.myForm.value)
  }

  next () {
    this.step = this.step + 1;
  }

  previous() {
    this.step = this.step - 1;
  }

  keyPress(event: any) {

    // const pattern = /[0-9\+\-\ ]/;
    const pattern = /[0-9\ ]/;
    
    let inputChar = String.fromCharCode(event.charCode);
    
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
    
    event.preventDefault();
    
    }
    
  }

  onImageUpload(event: any) {
    const selectedFiles = event.target.files;
    const picturesArray = this.myForm.get('pictures') as FormArray;
    
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64 = reader.result as string;
        this.imagePreview = base64;
        picturesArray.push(new FormControl(base64));
      };
  
      reader.readAsDataURL(file);
    }
  }
  

  // getSafeUrl(url: string) {
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }
}
