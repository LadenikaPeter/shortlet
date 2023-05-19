import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NewShortletService } from 'src/app/services/new-shortlet.service';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-delete-listing',
  templateUrl: './delete-listing.component.html',
  styleUrls: ['./delete-listing.component.css'],
})
export class DeleteListingComponent implements OnInit {
  apartmentId: number;
  email: string;
  token: string;
  constructor(
    private newshortletS: NewShortletService,
    private authS: AuthService,
    private notif: NotificationService
  ) {}

  ngOnInit() {
    this.newshortletS.getListingData.subscribe((res: { id: number }) => {
      this.apartmentId = res.id;
      console.log(this.apartmentId);
    });

    this.authS.user.subscribe((res: User) => {
      // console.log(res.email);
      if (res) {
        this.token = res.oauthAccessToken;
        this.email = res.email;
      }
    });
  }

  deleteListing() {
    this.newshortletS
      .DeleteListing(this.apartmentId, this.email, this.token)
      .subscribe((res) => {
        console.log(res);
        this.notif.successMessage(res);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      });
  }
}
