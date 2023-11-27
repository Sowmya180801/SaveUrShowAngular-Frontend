import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../data';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.css']
})
export class ViewMoviesComponent implements OnInit {
FindTickets:any;
data!:Data;
searchForm;
sortedMovies: Data[] = [];
selectedSortOption: string = 'Default';
search: string = ''; 
originalMovies: Data[] = []; 
showScreeningMovies: boolean = true;

  constructor(private dataService: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) 
    { 
      this.searchForm = this.formBuilder.group({
        search: '',
        location:'',
      });
    }

  ngOnInit(): void {
    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.FindTickets = data;
    })
    this.selectedSortOption = 'Default';
  this.sortMovies();
  this.dataService.getAll().subscribe((data: Data[]) => {
    this.originalMovies = data;
    this.sortedMovies = data; 
  });
    
  }
  
  searchMovies(): void {
    const searchControl = this.searchForm.get('search');
    if (searchControl && searchControl.value) {
      const searchTerm = searchControl.value.toLowerCase();
      this.sortedMovies = this.FindTickets.filter((movie: Data) =>
        movie.moviename.toLowerCase().includes(searchTerm),
        
      );
    }
    this.searchForm.reset();
  }
 searchLocation():void{
  const locationValue = this.searchForm.get('location');
  if (locationValue && locationValue.value) {
    const searchTerm = locationValue.value.toLowerCase();
    this.sortedMovies = this.FindTickets.filter((location: Data) =>
      location.location.toLowerCase().includes(searchTerm)
      
    );
  }
  this.searchForm.reset();
 }

sortMovies(): void {
  const filteredMovies = this.originalMovies.filter(movie => movie.screening === 'Yes');

  switch (this.selectedSortOption) {
    case 'Rating (High to Low)':
      this.sortedMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
      break;
    case 'Rating (Low to High)':
      this.sortedMovies = filteredMovies.sort((a, b) => a.rating - b.rating);
      break;
    default:
      this.sortedMovies = filteredMovies;
      break;
  }
}


}
