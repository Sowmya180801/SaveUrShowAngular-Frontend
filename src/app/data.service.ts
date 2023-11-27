import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import {  Observable, throwError,BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Data } from './data';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiURL = "https://localhost:44361/api";
  private apiurl = 'https://localhost:44361/api/FindTickets';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.apiURL+'/FindTickets');
  }
  
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/FindTickets/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(data:any): Observable<any> {
    return this.httpClient.post(this.apiURL + '/FindTickets/', JSON.stringify(data), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  } 

  postFindTicket(findTicket: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Add any other headers as needed
    });

    return this.httpClient.post(this.apiurl, findTicket, { headers });
  }

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/FindTickets/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id:number, data:Data): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/FindTickets/' + id, JSON.stringify(data), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
  updateMovie(movie: any): Observable<string> {
    // Make an HTTP PUT request to update the item on the server
    return this.httpClient.put<string>(`${this.apiURL}/FindTickets/${movie.id}`, movie);
  }
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/FindTickets/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  public search = new BehaviorSubject<string>("");
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
