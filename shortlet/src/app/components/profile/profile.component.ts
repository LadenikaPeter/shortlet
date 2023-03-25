import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private dataS: DataStorageService,
    private notif: NotificationService
  ) {}
  profileForm: FormGroup;

  ngOnInit(): void {
    this.dataS.getUser().subscribe((res: { email: string; name: string }) => {
      // console.log(res);
      this.profileForm.patchValue({
        name: res.name,
        email: res.email,
      });
    });
    this.profileForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.max(11)),
      email: new FormControl(null),
    });
  }

  keyPress(event: any) {
    // const pattern = /[0-9\+\-\ ]/;
    const pattern = /[0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  onSubmit() {
    let phoneNo = this.profileForm.value['phoneNumber'];
    let name = this.profileForm.value['name'];
    const updateUser = {
      name: name,
      phoneNo: phoneNo,
    };

    if (name === '') {
      this.notif.warningMessage('please provide a name');
    } else if (phoneNo !== null && phoneNo !== '') {
      if (Object.values(phoneNo).join('').length <= 10) {
        this.notif.warningMessage('please provide 11 digits');
      } else {
        // console.log(this.profileForm.value);
        this.dataS
          .updateUserInfo(updateUser, this.profileForm.value['email'])
          .subscribe((res) => {
            console.log(res);
          });
      }
    } else {
      // console.log(this.profileForm.value);
      this.dataS
        .updateUserInfo(updateUser, this.profileForm.value['email'])
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
