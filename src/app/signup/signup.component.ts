import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn} from '@angular/forms';

function emailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidEmail: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class signupComponent implements OnInit {
  form!: FormGroup;
  duplicateUserError=false;
  constructor(
    public userService: UserService,
    private router: Router
  ) { }
    

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, emailValidator()]),
      password: new FormControl('', Validators.required),
      confirmpassword: new FormControl('', Validators.required),
      //usertype :new FormControl('',Validators.required)
    });
  }   
 
  get f(){
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    if(this.form.value.password != this.form.value.confirmpassword){
      alert("Password and Confirm Password must be same!");
    }
    else{
      this.userService.checkDuplicateUser(this.form.value.email).subscribe(
        (duplicateResponse: any) => {
          if (duplicateResponse.isDuplicate) {
            this.duplicateUserError = true;
            console.log('duplicate user detetcted');
            //alert(" You are already a registered user.");
            
            setTimeout(() => {
              this.duplicateUserError = true;
              this.router.navigate(['/login']);
            }, 5000);
          } else {
            this.userService.create(this.form.value).subscribe(
              (res) => {
               
              console.log("Account Signed successfully!");
                this.router.navigate(['/login']);
              },
              (err:any)=>{
                console.log(err);
          }
            )};
        },
        (error) => {
          console.log("Error checking for duplicate user:", error);
        }
      );
    }
    this.userService.create(this.form.value).subscribe((res:any) => {
      // alert("Registered successfully!!");
         console.log('Account signed successfully!');
         this.router.navigateByUrl('login');
    })
  }
}
