import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css']
})
export class AddmovieComponent {
  addMovieForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.addMovieForm = this.fb.group({
      Location: ['', Validators.required],
      Theatrename: ['', Validators.required],
      Moviename: ['', Validators.required],
      MovieLink: [''],
      synopsis: [''],
      Genre: [''],
      trailer: [''],
      rating: [0],
      duration: [''],
      heroname: [''],
      heroimg: [''],
      heroinename: [''],
      heroineimg: [''],
      charges: [0],
      Date: [null, Validators.required],
      screening:[''],
    });
  }

  onSubmit(): void {
    if (this.addMovieForm.valid) {
      const movieData = this.addMovieForm.value;

      this.http.post('https://localhost:44361/api/FindTickets', movieData)
        .subscribe(
          response => {
            console.log('Movie added successfully:', response);
            alert("Movie added successfully")
            this.addMovieForm.reset();
       this.router.navigateByUrl('/movieIndex');
          },
          error => {
            console.error('Error adding movie:', error);
          }
        );
    }
  }
}
