import { Component, OnInit } from '@angular/core';
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

    this.authS.user.subscribe((res: { email: string }) => {
      // console.log(res.email);
      this.email = res.email;
    });
  }

  deleteListing() {
    this.newshortletS
      .DeleteListing(this.apartmentId, this.email)
      .subscribe((res) => {
        console.log(res);
        this.notif.successMessage(res);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      });
  }
}
