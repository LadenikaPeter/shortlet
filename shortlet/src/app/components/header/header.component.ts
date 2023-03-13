import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
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
  closeProfileDivSubscription: Subscription;
  isProfileClicked: boolean = false;

  constructor(
    private authS: AuthService,
    private closeTab: HandlingClosingProfileTab
  ) {}

  ngOnInit(): void {
    this.isAuth_Subcription = this.authS.user.subscribe((user) => {
      this.isAuthenticated = user;
    });
  }

  toggleProfileDiv() {
    this.isProfileClicked = !this.isProfileClicked;
  }

  authenticateWithGoogle() {
    this.authS.loginWithGoogle();
  }

  // authenticateWithFacebook() {
  //   this.auth.loginWithFacebook();
  // }

  ngOnDestroy(): void {
    this.isAuth_Subcription.unsubscribe();
  }

  onLogOut() {
    this.authS.logOut();
  }
}
