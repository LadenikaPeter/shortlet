import { NgModule } from '@angular/core';
import {
  AuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewShortletComponent } from './components/new-shortlet/new-shortlet.component';
import { RegisterShortletComponent } from './components/new-shortlet/register-shortlet/register-shortlet.component';
import { BookingComponent } from './components/shortlet/booking/booking.component';
import { ShortletComponent } from './components/shortlet/shortlet.component';
import { TripsComponent } from './components/trips/trips.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ListingComponent } from './components/new-shortlet/listing/listing.component';
import { AdminComponent } from './components/admin/admin.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'shortlet/:id/booking', component: BookingComponent },
  {
    path: 'shortlet/:id',
    component: ShortletComponent,
    children: [
      // { path: '', redirectTo: 'overview', pathMatch: 'full' },
      // { path: 'shortlet/:id/booking', component: BookingComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'host/shortlets',
    component: NewShortletComponent,
  },
  {
    path: 'host/shortlets/new',
    component: RegisterShortletComponent,
  },
  {
    path: 'trips',
    component: TripsComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'listings',
    component: ListingComponent
  },
  { path: 'admin', component: AdminComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
