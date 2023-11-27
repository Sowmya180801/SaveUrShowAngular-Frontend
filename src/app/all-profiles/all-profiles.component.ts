import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.css']
})
export class AllProfilesComponent {
  users:User[]=[];
  userid!: number;
  showPassword: boolean = false;
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
}

  ngOnInit(): void {
  
    this.userService.getAll().subscribe((user: User[])=>{
      this.users = user;
      console.log(this.users);
    })  
  }
}
