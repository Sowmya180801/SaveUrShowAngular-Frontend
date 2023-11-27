import { Component,OnInit } from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; 
    const currentMonth = currentDate.getMonth() + 1;
    const inputDate = control.value ? new Date(control.value + 'T00:00:00') : null;
    if (inputDate &&inputDate  <= currentDate) {
      return { futureDate: true }; 
    }
    return null; 
  };
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
  bankForm: FormGroup;
   totalCost!:number;
  minDate = new Date().toISOString().split('T')[0];
  cardNumber: any;
  ExpiryDate: string = '';
  CVV: any;
  showSuccessMessage: boolean = false;
  
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute) {
    this.bankForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      ExpiryDate: ['', [Validators.required, futureDateValidator()]],
      CVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]] 
    });
  }
  ngOnInit(): void {this.route.params.subscribe((params) => {
    this.totalCost = +params['totalCost']; 
  });}

  
  
  submitBankDetails() {
    const bankCredData = {
      cardNumber: this.cardNumber,
      ExpiryDate: this.ExpiryDate,
      CVV: this.CVV, 
      isActive: true, 
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  booking() {
    alert('Transaction complete!!!');
  }
  private updatePaymentStatus(status: string) {
    const paymentResultElement = document.getElementById('paymentResult');
    if (paymentResultElement) {
      paymentResultElement.textContent = status;
    }
  }

}

