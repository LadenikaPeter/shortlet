import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-new-shortlet',
  templateUrl: './new-shortlet.component.html',
  styleUrls: ['./new-shortlet.component.css'],
})
export class NewShortletComponent {
  constructor(private authS: AuthService) {}

  isUserAuth: any;

  ngOnInit() {
    this.authS.user.subscribe((user) => {
      if (user) {
        this.isUserAuth = user;
      } else {
        this.isUserAuth = false;
      }
    });
  }

  authenticateWithGoogle() {
    this.authS.loginWithGoogle();
  }
}
