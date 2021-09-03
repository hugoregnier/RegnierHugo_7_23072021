import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  login:string = ""
  pass:string = ""
  error:any

  constructor(
    public data: DataService
    ,private router: Router
  ) { }

  connexion(){
    console.log(this.login, this.pass)
    this.data.loginUser(this.login, this.pass)
    .then(res=>{
      if(res===true){
        this.router.navigate(['/home']);
      }
    })
    .catch(err=>{
      this.error = err
      console.log(this.error)
    })
  }

  ngOnInit(): void {
  }

}
