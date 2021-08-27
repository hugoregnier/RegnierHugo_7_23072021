import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  server = "http://localhost:3000/api"
  user
  userObject = Object()

  getUser() {
    this.http.get(this.server+"/getUser").subscribe((response) => {
      this.user=response
      for(let i in response){
        this.userObject[response[i]._id] = response[i]
      }
      console.log(this.user)
    })
  }
  
  constructor(private http: HttpClient) { 
    this.getUser()
  }

  // server = "http://localhost:3000/api"
  // user = Object()

  // newUser() {
  //   this.http.get(this.server+"/user/me").subscribe((response) => {
  //     this.user = response
  //     console.log(this.user);

  //   })
  // }
  

  // getUser() {
  //   this.http.get(this.server+"/user/me").subscribe((response) => {
  //     this.user = response
  //     console.log(this.user);
      
  //   })
  // }


  
}
