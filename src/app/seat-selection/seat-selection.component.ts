import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SeatSelectionService } from '../seat-selection.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  @Input() movieId!: number;
  @Input() ticketQuantity!: number;
  @Output() selectedSeatsChange = new EventEmitter<number[]>();

  totalRows: number = 10;
  totalCols: number = 10;
  bookedSeats: number[] = [];
  selectedSeats: number[] = [];
  seatGrid: number[][] = [];

  constructor(private seatSelectionService: SeatSelectionService) {}

  ngOnInit(): void {
    this.generateSeatGrid();
    this.getBookedSeats();
  }

  generateSeatGrid() {
    for (let row = 1; row <= this.totalRows; row++) {
      const seatsInRow: number[] = [];
      for (let col = 1; col <= this.totalCols; col++) {
        const seatNumber = (row - 1) * this.totalCols + col;
        seatsInRow.push(seatNumber);
      }
      this.seatGrid.push(seatsInRow);
    }
  }

  getBookedSeats() {
    this.seatSelectionService.getBookedSeats(this.movieId).subscribe(
      (data) => {
        this.bookedSeats = data;
      },
      (error) => {
        console.error('Error getting booked seats:', error);
      }
    );
  }

  toggleSeat(seatNumber: number) {
    if (this.isSeatAvailable(seatNumber) && this.selectedSeats.length < this.ticketQuantity) {
      if (this.selectedSeats.includes(seatNumber)) {
        this.selectedSeats = this.selectedSeats.filter((seat) => seat !== seatNumber);
      } else {
        this.selectedSeats.push(seatNumber);
      }
      this.seatSelectionService.updateSelectedSeats([...this.selectedSeats]);
    }
  }

  isSeatBooked(seatNumber: number): boolean {
    return this.bookedSeats.includes(seatNumber);
  }

  isSeatSelected(seatNumber: number): boolean {
    return this.selectedSeats.includes(seatNumber);
  }

  isSeatAvailable(seatNumber: number): boolean {
    return !this.isSeatBooked(seatNumber) && !this.selectedSeats.includes(seatNumber);
  }
}
