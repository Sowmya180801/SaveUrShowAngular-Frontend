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
import { NotFoundComponent } from './not-found/not-found.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: signupComponent },
  {path:"customerDashboard",component:CustomerDashboardComponent ,canActivate: [AuthGuard]},
  {path:"adminDashboard",component:AdminDashboardComponent, canActivate: [AuthGuard] },
  {path:"viewMovies",component:ViewMoviesComponent, canActivate: [AuthGuard]},
  {path:"viewProfile/:userid",component:ViewProfileComponent, canActivate: [AuthGuard]},
  {path:"editProfile/:userid",component:EditProfileComponent, canActivate: [AuthGuard]},
   {path:"userBookings/:userid",component:UserBookingsComponent, canActivate: [AuthGuard]},
  {path:"movieIndex",component:MovieIndexComponent, canActivate: [AuthGuard]},
  {path:"allBookings",component:AllBookingsComponent, canActivate: [AuthGuard]},
  {path:"contactus",component:ContactusComponent},
  {path:"aboutus",component:AboutusComponent},
  {path:"movieView/:movieId/view",component:MovieViewComponent , canActivate: [AuthGuard]},
  {path:"singleView/:movieId/view",component:SingleViewComponent, canActivate: [AuthGuard]},
  {path:"booking/:movieId/view",component:BookingComponent, canActivate: [AuthGuard]},
  {path:"payment/:totalCost",component:PaymentComponent, canActivate: [AuthGuard]},
  {path:"success",component:SuccessComponent, canActivate: [AuthGuard]},
  {path: 'booking-history/:userid', component: BookingHistoryComponent, canActivate: [AuthGuard] },
  {path:'AllProfiles',component:AllProfilesComponent, canActivate: [AuthGuard]},
  {path:'showfeed',component:ShowfeedComponent},
  {path:'createfeed',component:CreatefeedComponent},
  {path:'addmovie',component:AddmovieComponent, canActivate: [AuthGuard]},
  {path: 'seatselection',component:SeatSelectionComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
