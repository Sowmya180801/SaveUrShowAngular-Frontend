import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../feedback.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createfeed',
  templateUrl: './createfeed.component.html',
  styleUrls: ['./createfeed.component.css'],
})
export class CreatefeedComponent implements OnInit {
  form!: FormGroup;
  error: string | null = null;

  movieNames: string[] = [];

  constructor(
    public feedbackService: FeedbackService,
    private router: Router,
    private formbuilder: FormBuilder,
    private http:HttpClient,
  ) {}
  
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      moviename: new FormControl('', Validators.required),
      review: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });
    this.fetchMovieNames();
  }
  get f() {
    return this.form.controls;
  }

  fetchMovieNames() {
    this.http.get<any[]>('https://localhost:44361/api/FindTickets').subscribe(
      data => {
        this.movieNames = data.map(movie => movie.moviename);
      },
      error => {
        console.error('Error fetching movie names:', error);
      }
    );
  }

  submit() {
    this.error = null; 
    console.log(this.form.value);
    this.feedbackService.create(this.form.value).subscribe(
      (res: any) => {
        console.log('Feedback submitted successfully', res);
        alert('Feedback submitted');
        this.form.reset();
      },
      (error) => {
        console.error('Error during feedback submission', error);
        this.error = 'An error occurred while submitting feedback. Please try again.';
      }
    );
    // this.feedbackService.create(this.form.value).subscribe((res: any) => {
    //   console.log('We recieved your feedback');
    //   alert('feedback submitted');
    //   this.form.reset();
    // });
  }
}
