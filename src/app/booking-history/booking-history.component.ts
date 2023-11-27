import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})

export class BookingHistoryComponent implements OnInit {
  // bookings: any[] = [];
  tickets:Ticket[]=[];
  userid!: number;

  constructor(private http: HttpClient,
    public userService: UserService,
    private route: ActivatedRoute,
    private ticketService : TicketService,
    private router: Router) {  }

    isDateBeforeCurrent(date: Date): boolean {
      const currentDate = new Date();
      const bookingDate = new Date(date);
      return bookingDate < currentDate;
    }
  
  ngOnInit(): void {
    this.userid = this.route.snapshot.params['userid'];
    this.ticketService.getBookingsByUserId(this.userid).subscribe((ticket: Ticket[])=>{
      this.tickets = ticket;
      console.log(this.tickets);

      //this.tickets.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.tickets.sort((a, b) => b.bookid - a.bookid);
      this.tickets.forEach((ticket) => {
        this.fetchMovieDetails(ticket);
      });

    });
  }
  fetchMovieDetails(ticket: Ticket): void {
    this.http
      .get<any>(`https://localhost:44361/api/FindTickets/${ticket.movieId}`)
      .subscribe((movieDetails) => {
        ticket.movieDetails = movieDetails;
      });
  }
}
