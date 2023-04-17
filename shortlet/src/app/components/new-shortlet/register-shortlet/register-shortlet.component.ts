import { Component, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/Model/user.model';
import {
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/auth.service';

// import { HttpClient } from '@angular/common/http'; // step 1

import { NewShortlet } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-register-shortlet',
  templateUrl: './register-shortlet.component.html',
  styleUrls: ['./register-shortlet.component.css'],
})
export class RegisterShortletComponent {
  step: any = 1;
  newShortlet: NewShortlet;
  isAuthenticated;
  isAuth_Subcription: Subscription;

  imagePreview: any;

  username: string;
  user_email: string;

  myForm: FormGroup;
  // picture: File;
  // pictures: FormArray;
  // base64Pictures: any = [];
  @ViewChild('shortletFile', /* TODO: add static flag */ { read: ElementRef })
  shortletFile: ElementRef;
  shortletDocumentFile: Array<any> = new Array();

  countries: any[] = [];

  constructor(
    // private sanitizer: DomSanitizer,
    private dataStorage: DataStorageService,
    private authS: AuthService,
    private notification: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    //reactive form
    this.myForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl(''),
      cleaningFee: new FormControl(''),
      price: new FormControl(''),
      maxNoOfGuests: new FormControl(''),
      noOfBedrooms: new FormControl(),
      noOfBeds: new FormControl(''),
      noOfBathrooms: new FormControl(),
      propertyType: new FormControl(''),
      houseType: new FormControl(''),
      amenities: new FormGroup({
        bbq_grill: new FormControl(false),
        pool: new FormControl(false),
        wifi: new FormControl(false),
        patio: new FormControl(false),
        washer: new FormControl(false),
        air_condition: new FormControl(false),
        work_space: new FormControl(false),
        fireplace: new FormControl(false),
        first_aid_kit: new FormControl(false),
      }),
      pictures: new FormArray([]),
    });

    // this.setPictureFormArray();
    // this.addPicture();

    // get countries list - step 3
    this.dataStorage.getCountry().subscribe((response) => {
      this.countries = response.map((country) => {
        return { name: country.name, code: country.alpha2Code };
      });
      // console.log(this.countries);
    });

    //google user info displays
    this.isAuth_Subcription = this.authS.user.subscribe((user: User) => {
      if (user) {
        this.username = user.displayName;
        this.user_email = user.email;
        // console.log(this.username);
      }
    });
  }

  googleAuth() {
    this.authS.loginWithGoogle();
  }

  removeFile(i) {
    this.shortletDocumentFile.splice(i, 1);
  }

  onFileSelect(event) {
    this.onImageUpload(event.target.files[0]);
  }
  onSubmit(form: FormGroup) {
    // console.log('Valid?', form.valid); // true or false

    // let formData = this.myForm.value

    this.myForm.patchValue({
      pictures: this.shortletDocumentFile,
    });

    let formData = this.myForm.value;

    console.log(formData);

    // api service called
    this.dataStorage.registerNewShortlet(formData, this.user_email).subscribe(
      (response) => {
        console.log((this.newShortlet = response));
        // function to return all users, show error if usernot registered to be implemented
      },
      (error) => console.log(error)
    );
    this.notification.successMessage('You have successfully added a home');

    //timeout function that redirects back to the /user-listings of the new homes after a user successfully submits the form
    setTimeout(() => {
      this.router.navigate(['/user-listings']);
    }, 3000);
    console.log(this.myForm.value);
  }

  next() {
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

  //function to handle image uploads and convert to base64
  // onImageUpload(event: any, i) {
  //   if (event.target.files[0]) {
  //     console.log(event.target.files[0]);
  //     this.pictures.at(i).get('filename').setValue(event.target.files[0].name);
  //     console.log(this.pictures.value);

  //     const reader = new FileReader(); // to read content of files
  //     reader.onload = () => {
  //       const base64 = reader.result as string;
  //       this.imagePreview = base64;
  //       // console.log(this.imagePreview);

  //       const picturesArray = this.myForm.get('pictures') as FormArray;
  //       picturesArray.at(i).get('url').setValue(base64); //push pictures to the array
  //     };

  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  onImageUpload(fileDetail) {
    let file: File = fileDetail;
    let fileName = file.name;

    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    toBase64(file).then((data) => {
      this.imagePreview = data;
      const imageObject = {
        image: this.imagePreview,
        filename: fileName,
        fileType: this.getFileType(file.type),
        url: this.imagePreview,
      };
      console.log(imageObject);
      this.shortletDocumentFile.push(imageObject);
      console.log(this.shortletDocumentFile);
    });
  }

  getFileType(type) {
    if (type.includes('png') || type.includes('jpg') || type.includes('jpeg')) {
      return 'jpg';
    } else {
      return false;
    }
  }

  // addPicture() {
  //   for (let i = 0; i < 5; i++) {
  //     this.pictures.push(
  //       new FormGroup({
  //         filename: new FormControl(''),
  //         image: new FormControl(''),
  //         url: new FormControl(''),
  //       })
  //       new FormControl(null, [Validators.required])
  //     );
  //   }
  // }

  // getSafeUrl(url: string) {
  //   return this.sanitizer.bypassSecurityTrustUrl(url);
  // }

  // ngOnDestroy(): void {
  //   this.isAuth_Subcription.unsubscribe();
  // }

  // setPictureFormArray() {
  //   this.myForm.setControl('pictures', new FormArray([]));
  //   this.pictures = this.myForm.get('pictures') as FormArray;
  // }
}
