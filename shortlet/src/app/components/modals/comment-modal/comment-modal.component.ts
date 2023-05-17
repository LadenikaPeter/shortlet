import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notifications.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css'],
})
export class CommentModalComponent implements OnInit {
  userComment: string = '';
  apartmentId: number;
  reservationId: number;
  user_email: string;

  constructor(
    private tripsS: TripsService,
    private authS: AuthService,
    private notif: NotificationService
  ) {}

  ngOnInit(): void {
    this.tripsS.newComment.subscribe(
      (res: { apartmentId: number; id: number }) => {
        this.apartmentId = res.apartmentId;
        this.reservationId = res.id;
        console.log(this.apartmentId, this.reservationId);
      }
    );

    this.authS.user.subscribe((user: User) => {
      if (user) {
        console.log(user.displayName);
        this.user_email = user.email;
        // console.log(this.username);
      } else {
        this.user_email = null;
      }
    });
  }

  onSendComment() {
    if (this.userComment === '') {
      return;
    } else {
      const userComment = {
        comment: this.userComment,
      };

      this.tripsS
        .sendComment(
          userComment,
          +this.reservationId,
          +this.apartmentId,
          this.user_email
        )
        .subscribe((res) => {
          console.log(res);
          this.userComment = '';
          this.notif.successMessage('Comment added!');
          setTimeout(() => {
            window.location.reload();
          }, 2500);
        });
    }
  }
}
