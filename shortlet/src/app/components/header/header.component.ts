import { Component, OnDestroy, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Subscription, map, take } from 'rxjs';
import { UserRole } from 'src/app/Model/user-role.model';
import { AuthService } from 'src/app/auth/auth.service';
import { HandlingClosingProfileTab } from 'src/app/services/handling-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: any;
  isAuth_Subcription: Subscription;
  userRole_subcription: Subscription;
  closeProfileDivSubscription: Subscription;
  isProfileClicked: boolean = false;
  isUserAdmin: any;
  // switchTextClick :boolean =false

  constructor(
    private authS: AuthService,
    private closeTab: HandlingClosingProfileTab
  ) {}

  ngOnInit(): void {
    this.isAuth_Subcription = this.authS.user.subscribe((user) => {
      this.isAuthenticated = user;
    });

    this.authS.userRole
      .pipe(
        map((res) => {
          if (res) {
            if (res.role === 'ADMIN') {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.isUserAdmin = res;
      });
  }

  toggleProfileDiv() {
    this.isProfileClicked = !this.isProfileClicked;
  }

  OnClickOutside() {
    this.isProfileClicked = false;
  }

  authenticateWithGoogle() {
    this.authS.loginWithGoogle();
  }

  // authenticateWithFacebook() {
  //   this.auth.loginWithFacebook();
  // }

  ngOnDestroy(): void {
    this.isAuth_Subcription.unsubscribe();
    this.userRole_subcription.unsubscribe();
  }

  onLogOut() {
    this.authS.logOut();
  }

  switchToAdmin() {
    // this.switchTextClick = !this.switchTextClick
  }
}
