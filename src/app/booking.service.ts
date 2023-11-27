import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingDetails: any;

  setBookingDetails(details: any) {
    this.bookingDetails = details;
  }

  getBookingDetails() {
    return this.bookingDetails;
  }

  constructor() { }
}
