import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  email = this.data.profil.email
  username = this.data.profil.username
  password = this.data.profil.password
  bio = this.data.profil.bio
  error: any

  // this.data.profil.email

  constructor(
    public data: DataService
    ,private router: Router
  ) {
    if(!this.data.authToken){
      this.router.navigate(['/login']);
    }
  }


  modify() {
    // console.log(this.title, this.content)
    this.data.modifyUser(this.email, this.username, this.password, this.bio)
    .then(res=>{
      if(res===true){
        // this.email = ""
        // this.username = ""
        // this.password = ""
        // this.bio = ""
        console.log("modification réussie");
        
      }
    })
    .catch(err=>{
      this.error = err
      console.log(this.error)
    })
  }

  // getUser() {
  //   for (let item of this.data.profil) {
  //     this.email = this.data.profil.email
  //   }
    
  // }

  // getUser() {
  //   this.data.readUser(this.email, this.username, this.pass, this.bio)

  // }


  ngOnInit(): void {
  }

}
