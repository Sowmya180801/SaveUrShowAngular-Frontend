import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { signupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
  
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { MovieIndexComponent } from './movie-index/movie-index.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { SingleViewComponent } from './single-view/single-view.component';
import { BookingComponent } from './booking/booking.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { ShowfeedComponent } from './showfeed/showfeed.component';
import { CreatefeedComponent } from './createfeed/createfeed.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    signupComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    ViewMoviesComponent,
    ViewProfileComponent,
    EditProfileComponent,
    LoginComponent,
    UserBookingsComponent,
    MovieIndexComponent,
    AllBookingsComponent,
    ContactusComponent,
    AboutusComponent,
    SearchFilterPipe,
    MovieViewComponent,
    SingleViewComponent,
    BookingComponent,
    PaymentComponent,
    SuccessComponent,
    BookingHistoryComponent,
    AllProfilesComponent,
    ShowfeedComponent,
    CreatefeedComponent,
    AddmovieComponent,
    SeatSelectionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
    MatFormFieldModule, 
    RouterModule.forRoot([
      { path: 'seat-selection/:movieid', component: SeatSelectionComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
