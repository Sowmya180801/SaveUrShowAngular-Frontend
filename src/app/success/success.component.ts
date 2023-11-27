import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { jsPDF } from 'jspdf';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { UserService } from '../user.service';
import { User } from '../user';
// import * as QRCode from 'qrcode';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  bookingDetails: any;
  IsLoggedIn: boolean = false;
  IsCustomer:boolean=false;
  users: User[] = [];
  email!:string;
  id!:number;
  qrCodeDataUrl!: string;

  form: FormGroup = this.fb.group({
    from_name: 'SaveUrShow',
    from_email: 'sowmyap1881@gmail.com',
    message: 'Enjoy your show😍 with your Favourite movie',
    to_email: '',
    movieName: '',
    ticketQuantity: '',
    seatNumbers: '',
    date: '',
    slot: '',
    theatrename: '',
    location: '',
  });

  constructor(
    private bookingService: BookingService,
    private fb: FormBuilder,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    const bookingDetailsString = sessionStorage.getItem('bookingDetails');
    if (bookingDetailsString) {
      this.bookingDetails = JSON.parse(bookingDetailsString);
      console.log(this.bookingDetails);
    }
    this.IsLoggedIn = localStorage.getItem('User') != null;
    var x = localStorage.getItem('User');
    if(x){
      this.IsCustomer = JSON.parse(x).value.username=='Customer';
      this.id = JSON.parse(x).value.userid;
      console.log(this.id);
      this.email = JSON.parse(x).value.email;
      console.log(this.email);
     }
  }
  getSlotTime(slot: string): string {
    switch (slot) {
      case 'Slot 1':
        return '8am to 11am';
      case 'Slot 2':
        return '12pm to 3pm';
      case 'Slot 3':
        return '4pm to 7pm';
      case 'Slot 4':
        return '8pm to 11pm';
      default:
        return 'Unknown';
    }
  }
  async send() {
    this.form.patchValue({ to_email: this.email });
    emailjs.init('O0lVbx2yvw2odlFHp');
    let response = await emailjs.send('service_jy642ce', 'template_qrsou1n', {
      // to_email: this.form.value.to_email,
      to_email:this.email,
      movieName: this.bookingDetails.movieName,
      ticketQuantity: this.bookingDetails.ticketQuantity,
      seatNumbers: this.bookingDetails.seatnum,
      date: this.bookingDetails.date,
      slot: this.bookingDetails.slot,
      theatrename: this.bookingDetails.theatrename,
      location: this.bookingDetails.location,
    });
    this.form.reset();
    console.log(response);
    alert('emai sent');
  }


  // generateQRCode(data: any): string {
  //   let qrCodeDataUrl: string;

  //   QRCode.toDataURL(JSON.stringify(data), function (error, url) {
  //     if (error) {
  //       console.error(error);
  //     } else {
  //       qrCodeDataUrl = url;
  //     }
  //   });
  //   return qrCodeDataUrl;
  // }

  downloadPDF(): void {
    const pdf = new jsPDF();
    pdf.setFont('Arial', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(30);
    pdf.text('Booking Details', 30, 40);

    const logoPath = '/assets/img/saveurshowlogo.png';
    const logoWidth = 40;
    const logoHeight = 40;
    const imgData = pdf.loadFile(logoPath);
    const logoX = pdf.internal.pageSize.width - 20 - logoWidth;
    pdf.addImage(imgData, 'PNG', logoX, 15, logoWidth, logoHeight);

    pdf.line(20, 60, pdf.internal.pageSize.width - 20, 60);

    const moviePoster = this.bookingDetails.movieLink;
    const moviePosterWidth = 80;
    const moviePosterHeight = 120;
    const moviePosterX = 20;
    const moviePosterY = 70;
    pdf.addImage(moviePoster, 'JPEG', moviePosterX, moviePosterY, moviePosterWidth, moviePosterHeight);

    pdf.setFontSize(15);
    const detailsX = moviePosterX + moviePosterWidth + 10;
    const detailsY = moviePosterY + 10;
    pdf.text(`Movie Name: ${this.bookingDetails.movieName}`, detailsX, detailsY);
    pdf.text(`Number of Tickets: ${this.bookingDetails.ticketQuantity}`, detailsX, detailsY + 10);
    pdf.text(`Seat Numbers: ${this.bookingDetails.seatnum}`, detailsX, detailsY + 20);
    pdf.text(`Date: ${this.bookingDetails.date}`, detailsX, detailsY + 30);
    pdf.text(`Slot: ${this.getSlotTime(this.bookingDetails.slot)}`, detailsX, detailsY + 40);
    pdf.text(`Theatre: ${this.bookingDetails.theatrename}`, detailsX, detailsY + 50);
    pdf.text(`Location: ${this.bookingDetails.location}`, detailsX, detailsY + 60);
    //this.qrCodeDataUrl = this.generateQRCode(this.bookingDetails);
    pdf.save('booking_details.pdf');
  }


}

