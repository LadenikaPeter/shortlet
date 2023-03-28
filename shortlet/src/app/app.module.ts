import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import * as fromenvironment from 'src/environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { ShortletComponent } from './components/shortlet/shortlet.component';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { BookingComponent } from './components/shortlet/booking/booking.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { NewShortletComponent } from './components/new-shortlet/new-shortlet.component';
import { RegisterShortletComponent } from './components/new-shortlet/register-shortlet/register-shortlet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchBarComponent } from './components/header/search-bar/search-bar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FilterBarComponent } from './components/header/filter-bar/filter-bar.component';
import { AuthServiceInterceptor } from './auth/auth.interceptor.service';
import { TripsComponent } from './components/trips/trips.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ShortletComponent,
    FooterComponent,
    BookingComponent,
    ProfileComponent,
    NewShortletComponent,
    RegisterShortletComponent,
    SearchBarComponent,
    FilterBarComponent,
    TripsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot(),
    Angular4PaystackModule.forRoot(fromenvironment.environment.paystack_key),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
