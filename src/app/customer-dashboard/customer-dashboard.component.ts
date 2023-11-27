import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
userid!:number;
user!: User;

IsLoggedIn: boolean = false;
users: User[] = [];
IsCustomer:boolean=false;
username!:string;

  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {


this.IsLoggedIn = localStorage.getItem('User') != null;
    var x = localStorage.getItem('User');
    if(x){
      this.IsCustomer = JSON.parse(x).value.username=='Customer';
      this.userid = JSON.parse(x).value.userid;
      this.username=JSON.parse(x).value.username;
      console.log(this.userid);      
     }
     this.userService.getAll().subscribe((data: User[])=>{
      this.users = data;
      console.log(this.users);
    })  
}

}
