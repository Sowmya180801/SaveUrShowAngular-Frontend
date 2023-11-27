import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { UserService } from '../user.service';
import { User } from '../user';
import { DataService } from '../data.service';
import { Data } from '../data';
@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {
tickets:Ticket[]=[];

  constructor(
    public ticketService:TicketService,
    public userService :UserService,
    public dataService:DataService,
  ) { }

  ngOnInit(): void {
  
      this.ticketService.getAll().subscribe((ticket: Ticket[])=>{
        this.tickets = ticket;
        console.log(this.tickets);

        this.tickets.forEach((ticket: Ticket) => {
          this.userService.getUserById(ticket.userid).subscribe((user: User) => {
            ticket.user = user;
            console.log(user);
          });
        });

        this.tickets.forEach((ticket: Ticket) => {
          this.dataService.find(ticket.movieId).subscribe((data: Data) => {
            ticket.data = data;
            console.log(data);
          });
        });
      })     
  }
  // deletePost(id:number){
  //   this.ticketService.delete(id).subscribe(res => {
  //        this.tickets = this.tickets.filter(item => item.bookid !== id);
  //        console.log('Post deleted successfully!');
  //   })
  // }
}
