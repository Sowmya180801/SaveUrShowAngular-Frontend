import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../data';
import { Ticket } from '../ticket';
import { TicketService } from '../ticket.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../booking.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { SeatSelectionService } from '../seat-selection.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  id!: number;
  data!: Data;
  ticketQuantity: number = 1;
  availableSlots: string[] = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4'];
  dateOptions: Date[] = [];
  bookingForm: FormGroup;
  IsLoggedIn: boolean = false;
  IsCustomer: boolean = false;
  userid!: number;
  selectedSeats: number[] = [];

  constructor(
    public dataService: DataService,
    public ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public bookingService: BookingService,
    public userService: UserService,
    public seatSelectionService :SeatSelectionService,
  ) {
    this.bookingForm = this.formBuilder.group({
      movieId: [null],
      userid: [null],
      ticketQuantity: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
      seatnum: ['', Validators.required],
      date: [null, Validators.required],
      slot: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['movieId'];
    this.dataService.find(this.id).subscribe((i: Data) => {
      this.data = i;
    });

    this.route.params.subscribe(params => {
      const movieId = params['movieId'];
      this.bookingForm.patchValue({ movieId: movieId });
    });
    this.seatSelectionService.selectedSeats$.subscribe((selectedSeats: number[]) => {
      // Update the seatnum form control with the selected seats
      this.selectedSeats = selectedSeats;
      this.bookingForm.patchValue({ seatnum: this.selectedSeats.join(', ') });
    });

    this.IsLoggedIn = localStorage.getItem('User') != null;
    var x = localStorage.getItem('User');
    if (x) {
      this.IsCustomer = JSON.parse(x).value.username == 'Customer';
      this.userid = JSON.parse(x).value.userid;
      this.bookingForm.patchValue({ userid: this.userid });
    }
    this.generateDateOptions();

    this.bookingForm.get('date')?.valueChanges.subscribe((selectedDate: Date) => {
      this.updateAvailableSlots(selectedDate);
    });
   
    
  }

  updateAvailableSlots(selectedDate: Date): void {
    const currentDate = new Date();

    this.availableSlots = ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4'];

    const currentTime = currentDate.getHours();

    this.availableSlots = this.availableSlots.filter(slot => {
      const slotStartTime = parseInt(slot.split(':')[0]);
      return selectedDate > currentDate || (selectedDate.getTime() === currentDate.getTime() && slotStartTime > currentTime);
    });
  }

  
  generateDateOptions(): void {
    const currentDate = new Date();
    for (let i = 0; i < 3; i++) {
      this.dateOptions.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  incrementTicketQuantity(): void {
    if (this.ticketQuantity < 4) {
      this.ticketQuantity++;
    }
  }

  decrementTicketQuantity(): void {
    if (this.ticketQuantity > 1) {
      this.ticketQuantity--;
    }
  }

  isFormValid(): boolean {
    return this.bookingForm.valid;
  }

  proceedToPayment(): void {
    const totalCost = this.data.charges * this.ticketQuantity;
    const seatnum = this.bookingForm.get('seatnum')?.value;
    const date = this.bookingForm.get('date')?.value;
    const slot = this.bookingForm.get('slot')?.value;

    const bookingDetails = {
      movieName: this.data.moviename,
      movieLink: this.data.movieLink,
      theatrename: this.data.theatrename,
      location: this.data.location,
      ticketQuantity: this.ticketQuantity,
      seatnum: this.selectedSeats,
      date: date,
      slot: slot,
      totalCost: totalCost,
    };

    const booking = {
      ticketQuantity: this.ticketQuantity,
      userid: this.userid,
      seatnum: seatnum,
      movieId: this.data.movieId,
      date: date,
      slot: slot,
    };

    this.http.post('https://localhost:44361/api/BookingTickets', booking)
      .subscribe(
        (response) => {
          console.log('Booking successful:', response);
          this.router.navigate(['/payment', totalCost]);
        },
        (error) => {
          console.error('Error during booking:', error);
        }
      );
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  }
}
