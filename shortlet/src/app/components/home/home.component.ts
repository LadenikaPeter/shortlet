import { Component, OnInit } from '@angular/core';
import { Shortlet } from 'src/app/Model/shortlet.model';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  availableShortlets: any = [];
  activeUser: boolean;

  constructor(
    private authS: AuthService,
    private user: UserService,
    private dataStorage: DataStorageService,
    private notif: NotificationService
  ) {}
  ngOnInit(): void {
    this.dataStorage.getShortlets().subscribe(
      (shortlet) => {
        this.availableShortlets = shortlet;
        // console.log(this.availableShortlets);
      },
      (error) => this.notif.errorMessage(error.message)
    );

    // this.user.getUser().subscribe((res: { activeUser: boolean }) => {
    //   // console.log(res);
    //   // console.log(this.activeUser = res.activeUser)

    //   if (this.activeUser) {
    //     console.log(this.activeUser);
    //     // after this, the user is logged out
    //     this.notif.errorMessage(
    //       'Your account has been disabled, contact support for help'
    //     );
    //     this.onLogOut();
    //   } else {
    //     // else block not necessary, test with disabled user
    //     this.notif.successMessage('Active user');
    //   }
    // });

    this.dataStorage.propertyType.subscribe(
      (selectedProperty) => {
        if (selectedProperty) {
          this.availableShortlets = selectedProperty;
        }
      },
      (error) => this.notif.errorMessage(error.message)
    );

    this.dataStorage.returnAllHomes.subscribe(
      (all_shortlets) => {
        this.availableShortlets = all_shortlets;
      },
      (error) => this.notif.errorMessage(error.message)
    );
  }

  onLogOut() {
    this.authS.logOut();
  }

  print(string, id) {
    console.log(string + id);
  }
}
