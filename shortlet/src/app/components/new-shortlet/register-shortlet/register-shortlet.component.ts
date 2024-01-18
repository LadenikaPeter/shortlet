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

import { NewShortlet, amenities } from 'src/app/interface/shortlet';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { NewShortletService } from 'src/app/services/new-shortlet.service';
import { AdminService } from 'src/app/services/admin.service';

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

  @ViewChild('shortletFile', /* TODO: add static flag */ { read: ElementRef })
  shortletFile: ElementRef;
  shortletDocumentFile: Array<any> = new Array();
  token: string;

  countries: any[] = [];

  allowedMimeType: any[] = ['image/png', 'image/jpeg', 'image/jpg'];
  houseType: string[] = [];
  propertyType: string[] = [];
  pendingRequestArray: any = [];

  constructor(
    // private sanitizer: DomSanitizer,
    private newshortletS: NewShortletService,
    private dataStorage: DataStorageService,
    private authS: AuthService,
    private notification: NotificationService,
    private router: Router,
    private notif: NotificationService,
    private adminS: AdminService
  ) {}

  ngOnInit() {
    //reactive form
    this.myForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      address: new FormControl(''),
      country: new FormControl(''),
      users: new FormGroup({
        phoneNo: new FormControl(''),
      }),
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

    // get countries list
    this.newshortletS.getCountry().subscribe((response) => {
      this.countries = response.map((country) => {
        return { name: country.name, code: country.alpha2Code };
      });
      // console.log(this.countries);
    });

    //google user info displays
    this.isAuth_Subcription = this.authS.user.subscribe((user: User) => {
      if (user) {
        this.token = user.oauthAccessToken;
        this.username = user.displayName;
        this.user_email = user.email;
      }
    });

    //api call to get all house types
    this.newshortletS.getAllPropertyTypes().subscribe((response) => {
      this.propertyType = response;
      // console.log(this.propertyType);
    });

    this.newshortletS.getAllHouseTypes().subscribe((response) => {
      this.houseType = response;
      console.log(this.houseType);
    });
  }

  //google authentication
  googleAuth() {
    this.authS.loginWithGoogle();
  }

  //remove uploaded image
  removeFile(i) {
    this.shortletDocumentFile.splice(i, 1);
  }

  //calls the file input when image is uploaded
  onFileSelect(event) {
    this.onImageUpload(event.target.files[0]);
  }

  //next function for multi-step form
  next() {
    this.step = this.step + 1;
  }

  //previous function for multi-step form
  previous() {
    this.step = this.step - 1;
  }

  //restricts input to only numeric values
  keyPress(event: any) {
    const pattern = /[0-9\ ]/;

    let inputChar = String.fromCharCode(event.charCode);

    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resetFileInput() {
    this.shortletFile.nativeElement.reset();
  }

  //converts image to  base64 and adds to the shortlet document file array
  onImageUpload(fileDetail) {
    let file: File = fileDetail;
    console.log(file.size);
    if (file.size < 2000000) {
      if (this.allowedMimeType.indexOf(file.type) != -1) {
        let fileName =
          file.name.length > 10
            ? file.name.substring(0, 10) + '...'
            : file.name;

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
          if (this.shortletDocumentFile.length < 5) {
            // console.log(imageObject);
            this.shortletDocumentFile.push(imageObject);
            console.log(this.shortletDocumentFile);
          } else {
            this.notif.warningMessage('Maximum of 5 pictures');
          }
        });
      } else {
        this.resetFileInput();
        this.notif.errorMessage('File format not supported');
      }
    } else {
      this.notif.warningMessage('image should not exceed 5mb');
    }
  }

  getFileType(type) {
    if (type.includes('png') || type.includes('jpg') || type.includes('jpeg')) {
      return 'jpg';
    } else {
      return false;
    }
  }

  onSubmit(form: FormGroup) {
    const users = {
      phoneNo: 'number',
    };

    if (this.shortletDocumentFile.length < 5) {
      this.notif.warningMessage('Please Upload 5 pictures');
    } else {
      const formData = {
        ...this.myForm.value,
        pictures: this.shortletDocumentFile,
      };

      // api service called
      this.newshortletS
        .registerNewShortlet(formData, this.user_email, this.token)
        .subscribe(
          (response) => {
            // console.log((this.newShortlet = response));
            // function to return all users, show error if usernot registered to be implemented
          },
          (error) => this.notification.errorMessage(error.message)
        );
      this.notification.successMessage('You have successfully added a home');

      //timeout function that redirects back to the /user-listings of the new homes after a user successfully submits the form
      setTimeout(() => {
        this.adminS.getAllPendingRequest(this.token).subscribe((res) => {
          this.pendingRequestArray = res;
          this.dataStorage.pendindRequestValue.next(
            this.pendingRequestArray.length
          );
          console.log(this.pendingRequestArray.length);
        });
        this.router.navigate(['/user-listings']);
      }, 3000);
    }
  }
}
