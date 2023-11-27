import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import { Ticket } from '../ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
tickets:Ticket[]=[];
ticket!: Ticket;
userid!: number;
  //user!: User;
 // id!:number;
  constructor(
    public userService: UserService,
    private ticketService:TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
//     this.userid = this.route.snapshot.params['userid'];
//     console.log(this.userid);
//    this.ticketService.find(this.userid).subscribe((data: Ticket[])=>{
//    console.log(data);
//    this.tickets = data;
// });

this.userid = this.route.snapshot.params['userid'];
console.log('User ID:', this.userid);
this.ticketService.find(this.userid).subscribe((i: Ticket)=>{
  this.ticket = i;
  console.log(this.ticket);

});
  }

}
