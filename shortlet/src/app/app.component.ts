import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authS: AuthService) {}
  title = 'shortlet';

  ngOnInit(): void {
    this.authS.autoLogin();
  }

  // @HostListener('document: click', ['$event']) closetab(eventdata: Event) {
  //   // console.log('i was clicked');
  //   this.closeTab.closeTabOfProfile.next(null);
  // }
}
