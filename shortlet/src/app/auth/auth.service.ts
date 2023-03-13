import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  linkWithCredential,
} from '@angular/fire/auth';
import { NotificationService } from '../services/notifications.service';
import { User } from '../Model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private expirationTimer: any;
  user = new BehaviorSubject<User>(null);
  // provider = new FacebookAuthProvider();

  constructor(
    private http: HttpClient,
    private auth: Auth,
    private notif: NotificationService
  ) {}

  loginWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((authenticated_user) => {
        // console.log(authentica);
        let userToken: string;
        authenticated_user.user.getIdToken().then((token: string) => {
          const expiresIn = 3600;

          this.handleAuthentication(
            authenticated_user.user.email,
            authenticated_user.user.displayName,
            authenticated_user.user.photoURL,
            token,
            expiresIn
          );
        });

        this.notif.successMessage('Successfully logged in');
      })
      .catch((error) => {
        this.notif.errorMessage(error.message);
      });
  }

  autoLogin() {
    const userData: {
      email: string;
      displayName: string;
      photoUrl: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('shortletUserData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.displayName,
      userData.photoUrl,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // console.log('im here');

    //checking if the token is valid
    if (loadedUser.token) {
      // console.log(' works here');
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  // loginWithFacebook() {
  //   signInWithPopup(this.auth, new FacebookAuthProvider())
  //     .then((authenticated_user) => {
  //       console.log(authenticated_user);
  //       this.notif.successMessage('Successfully logged in');
  //     })
  //     .catch((error) => {
  //       // this.notif.errorMessage('sorry, Something went wrong')
  //       if (error.code === 'auth/account-exists-with-different-credential') {
  //         // console.log(error.credential);
  //       }
  //     });
  // }

  private handleAuthentication(
    email: string,
    displayName: string,
    photoURL: string,
    userToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      displayName,
      photoURL,
      userToken,
      expirationDate
    );
    this.user.next(user);
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('shortletUserData', JSON.stringify(user));
  }

  logOut() {
    signOut(this.auth).then(() => {
      this.user.next(null);
      localStorage.removeItem('shortletUserData');
      if (this.expirationTimer) {
        clearTimeout(this.expirationTimer);
      }
      this.expirationTimer = null;
    });
  }

  autoLogOut(expirationDuration: number) {
    // console.log(expirationDuration);
    this.expirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }
}
