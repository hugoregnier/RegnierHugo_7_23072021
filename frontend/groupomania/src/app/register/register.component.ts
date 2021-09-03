import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = ""
  username: string = ""
  pass: string = ""
  bio : string = ""
  error: any

  constructor(
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
  }

}
