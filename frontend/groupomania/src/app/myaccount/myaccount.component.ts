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
  reponseM: any
  reponseD: any

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
    // console.log(this.title, this.content)
    this.data.deleteUser(this.email, this.username, this.password, this.bio)
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
  }

}
