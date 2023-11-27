import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userid!: number ; 
  private isAuthenticated = false; 
  private apiURL = "https://localhost:44361/api";
  private baseUrl = 'https://localhost:44361/api/Registrations';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  checkDuplicateUser(email: string): Observable<any> {
    const url = `${this.apiURL}/Registrations/checkDuplicateUser?email=${email}`;
    return this.httpClient.get(url);
  }

  setUserId(userId: number) {
    this.userid = userId;
  }

  // Method to get the user ID
  getUserId(): number {
    return this.userid;
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<User>(url);
  }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
  
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/Registrations/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
    

  create(user:User): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/Registrations/', JSON.stringify(user), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    

  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/Registrations/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    

  update(id:number, user:User): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/Registrations/' + id, JSON.stringify(user), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/Registrations/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

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
