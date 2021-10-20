import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  registerForm: any;
  submitted = false;

  email = this.data.profil.email
  username = this.data.profil.username
  password = this.data.profil.password
  bio = this.data.profil.bio
  error: any
  reponseM: any
  reponseD: any

  constructor(
    private formBuilder: FormBuilder,
    public data: DataService,
    private router: Router
  ) {
    if(!this.data.authToken){
      this.router.navigate(['/login']);
    }
  }


  modify() {
    // this.data.modifyUser(this.email, this.username, this.password, this.bio)
    this.data.modifyUser(this.registerForm.get('email').value, this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('bio').value)
    .then(res=>{
      if(res===true){
        this.reponseM = "modification réussie"
        console.log("modification réussie");
      }
    })
    .catch(err=>{
      this.error = err
      console.log(this.error)
    })
  }

  delete() {
    // this.data.deleteUser(this.email, this.username, this.password, this.bio)
    this.data.deleteUser(this.registerForm.get('email').value, this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('bio').value)
    .then(res=>{
      if(res===true){
        this.reponseD = "suppression réussie"
        this.data.logout();
        this.router.navigate(['/login']);
        console.log("suppression réussie");
        
      }
    })
    .catch(err=>{
      this.error = err
      console.log(this.error)
    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['',  [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      bio: [''],
  });
  this.registerForm.controls['email'].setValue(this.data.profil.email)
  this.registerForm.controls['username'].setValue(this.data.profil.username)
  this.registerForm.controls['password'].setValue(this.data.profil.password)
  this.registerForm.controls['bio'].setValue(this.data.profil.bio)
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
  }

}
