
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInVar = false;

  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  login(email: string, password: string): void {
    if (email && password) {
      this.isLoggedInVar = true;
    }
  }

  logout(): void {
    this.isLoggedInVar = false;
  }
}

