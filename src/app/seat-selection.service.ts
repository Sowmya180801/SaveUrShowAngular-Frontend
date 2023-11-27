import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeatSelectionService {
  private apiUrl = 'https://localhost:44361/api/FindTickets/booking';
  private selectedSeatsSubject = new BehaviorSubject<number[]>([]);
  selectedSeats$ = this.selectedSeatsSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateSelectedSeats(selectedSeats: number[]) {
    this.selectedSeatsSubject.next(selectedSeats);
  }

  getBookedSeats(movieId: number): Observable<number[]> {
    const url = `${this.apiUrl}/${movieId}`;
    return this.http.get<number[]>(url);
  }
}
