import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { TripsComponent } from './trips.component';
import { TripsRoutingModule } from './trips-routing.module';
import { CommentModalComponent } from '../modals/comment-modal/comment-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TripsComponent, CommentModalComponent],
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    TripsRoutingModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [TripsComponent, CommentModalComponent],
})
export class TripsModule {}
