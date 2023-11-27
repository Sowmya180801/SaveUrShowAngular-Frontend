import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../data';
import { UserService } from '../user.service';
@Component({
  selector: 'app-single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.css']
})
export class SingleViewComponent implements OnInit {
  id!: number;
  data!: Data;
  
  constructor( public dataService: DataService,
    private route: ActivatedRoute,
    public userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['movieId'];
        
    this.dataService.find(this.id).subscribe((i: Data)=>{
      this.data = i;
      console.log(this.data);

    });
  }
  
  // bookTickets(): void {
  //   if (this.userService.isAuthenticatedUser()) {
  //     this.router.navigate(['/booking/', this.data.movieId, 'view']);
  //   } else {  
  //     this.router.navigate(['/login']);
  //     console.log('User is not logged in. Redirect to login page or show login modal.');
  //   }
  // }

  // getVideoId(url: string): string {
  //   const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([\w-]{11})/);
  //   return (match && match[1]) || '';
  // }
}
