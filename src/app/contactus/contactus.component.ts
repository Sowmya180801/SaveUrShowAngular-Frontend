import { Component, OnInit } from '@angular/core';
import emailjs from '@emailjs/browser'; 
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  form :FormGroup=this.fb.group({
    full_name:'',
    email:'',
    message:'',
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
 
  async send(){
    emailjs.init('O0lVbx2yvw2odlFHp');
      let response =emailjs.send("service_jy642ce","template_vn9yf7g",{
      full_name: this.form.value.full_name,
      email: this.form.value.email,
      message: this.form.value.message,
      });
      alert("Your request has been sent.");
      this.form.reset();
  } 
}
