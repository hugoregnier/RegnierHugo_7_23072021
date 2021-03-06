import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  connectForm: any;
  submitted = false;

  // login: string = ""
  // pass: string = ""
  error: any

  constructor(
    private formBuilder: FormBuilder,
    public data: DataService, 
    private router: Router
  ) {
    localStorage.clear()
  }

  connexion() {
    this.data.loginUser(this.connectForm.get('login').value, this.connectForm.get('pass').value)
      .then(res => {
        if (res === true) {
          this.router.navigate(['/home']);
        }
      })
      .catch(err => {
        this.error = err
        console.log(this.error)
      })
  }

  ngOnInit(): void {
    this.connectForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  get f() { return this.connectForm.controls; }

  onSubmit() {   
    this.submitted = true;
    // stop here if form is invalid
    if (this.connectForm.invalid) {
        return;
    }
}

}
