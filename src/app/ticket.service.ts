import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ticket } from './ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiURL = "https://localhost:44361/api";
  private apiUrl = 'https://localhost:44361/api/BookingTickets';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBookingsByUserId(userid: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/BookingTickets/user/${userid}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  bookTicket(bookTicket: Ticket): Observable<Ticket> {
    return this.httpClient.post<Ticket>(this.apiUrl, bookTicket);
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/BookingTickets')
    .pipe(
      catchError(this.errorHandler)
    )
  }


  create (ticket:Ticket) : Observable<any>{
    return this.httpClient.post(this.apiURL+'/BookingTickets/',JSON.stringify(ticket),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(userid:number):Observable<any>{
    return this.httpClient.get(this.apiURL+'/BookingTickets/'+userid)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(Bookid:number,ticket:Ticket):Observable<any>{
    return this.httpClient.put(this.apiURL+'/BookingTickets/'+Bookid,JSON.stringify(ticket),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
delete(Bookid:number){
  return this.httpClient.delete(this.apiURL+'/BookingTickets/'+Bookid,this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

errorHandler(error:any){
  let errorMessage='';
  if(error.error instanceof ErrorEvent){
    errorMessage=error.error.message;
  }
  else{
    errorMessage=`Error Code : ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}
}


// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
     
// import {  Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Ticket } from './ticket';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private apiURL = "http://localhost:57247/api";
    
//   /*------------------------------------------
//   --------------------------------------------
//   Http Header Options
//   --------------------------------------------
//   --------------------------------------------*/
//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     })
//   }
   
//   /*------------------------------------------
//   --------------------------------------------
//   Created constructor
//   --------------------------------------------
//   --------------------------------------------*/
//   constructor(private httpClient: HttpClient) { }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   getAll(): Observable<any> {
  
//     return this.httpClient.get(this.apiURL + '/BookTickets/')
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   create(ticket:Ticket): Observable<any> {
  
//     return this.httpClient.post(this.apiURL + '/BookTickets/', JSON.stringify(ticket), this.httpOptions)
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }  
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   find(id:number): Observable<any> {
  
//     return this.httpClient.get(this.apiURL + '/BookTickets/' + id)
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }
    
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   update(id:number, ticket:Ticket): Observable<any> {
  
//     return this.httpClient.put(this.apiURL + '/BookTickets/' + id, JSON.stringify(ticket), this.httpOptions)
  
//     .pipe( 
//       catchError(this.errorHandler)
//     )
//   }
       
//   /**
//    * Write code on Method
//    *
//    * @return response()
//    */
//   delete(id:number){
//     return this.httpClient.delete(this.apiURL + '/BookTickets/' + id, this.httpOptions)
  
//     .pipe(
//       catchError(this.errorHandler)
//     )
//   }
      
//   /** 
//    * Write code on Method
//    *
//    * @return response()
//    */
//   errorHandler(error:any) {
//     let errorMessage = '';
//     if(error.error instanceof ErrorEvent) {
//       errorMessage = error.error.message;
//     } else {
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     return throwError(errorMessage);
//   }
//   }
  