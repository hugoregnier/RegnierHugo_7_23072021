import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  submitted = false;


  email: string = ""
  username: string = ""
  pass: string = ""
  bio : string = ""
  error: any

  constructor(
    private formBuilder: FormBuilder,
    public data: DataService
    ,private router: Router
  ) { }

  register() {
    console.log(this.email, this.username, this.pass, this.bio)
    this.data.createUser(this.email, this.username, this.pass, this.bio)
    .then(res=>{
      if(res===true){
        this.router.navigate(['/login']);
      }
    })
    .catch(err=>{
      this.error = err
    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
      bio: [''],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      // display form values on success
      alert('Vous etes enregistré ! \n Cliquez sur OK et Connectez vous');
  }

}
