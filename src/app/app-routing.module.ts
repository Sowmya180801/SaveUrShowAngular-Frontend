import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { signupComponent } from './signup/signup.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewMoviesComponent } from './view-movies/view-movies.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserBookingsComponent } from './user-bookings/user-bookings.component';
import { MovieIndexComponent } from './movie-index/movie-index.component';
import { AllBookingsComponent } from './all-bookings/all-bookings.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
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
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: signupComponent },
  {path:"customerDashboard",component:CustomerDashboardComponent},
  {path:"adminDashboard",component:AdminDashboardComponent, },
  {path:"viewMovies",component:ViewMoviesComponent},
  {path:"viewProfile/:userid",component:ViewProfileComponent},
  {path:"editProfile/:userid",component:EditProfileComponent},
   {path:"userBookings/:userid",component:UserBookingsComponent},
  {path:"movieIndex",component:MovieIndexComponent},
  {path:"allBookings",component:AllBookingsComponent},
  {path:"contactus",component:ContactusComponent},
  {path:"aboutus",component:AboutusComponent},
  {path:"movieView/:movieId/view",component:MovieViewComponent},
  {path:"singleView/:movieId/view",component:SingleViewComponent},
  {path:"booking/:movieId/view",component:BookingComponent},
  {path:"payment/:totalCost",component:PaymentComponent},
  {path:"success",component:SuccessComponent},
  {path: 'booking-history/:userid', component: BookingHistoryComponent },
  {path:'AllProfiles',component:AllProfilesComponent},
  {path:'showfeed',component:ShowfeedComponent},
  {path:'createfeed',component:CreatefeedComponent},
  {path:'addmovie',component:AddmovieComponent},
  {path: 'seatselection',component:SeatSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
