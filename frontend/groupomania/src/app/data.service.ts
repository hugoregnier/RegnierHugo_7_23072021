import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  server = "http://localhost:3000/api"
  user: any;
  messages: any;
  // userObject = Object()

  getUser() {
    this.http.get(this.server+"/user/me").subscribe((response) => {
      this.user = response
      // for(let i in response){
      //   this.userObject[response[i]._id] = response[i]
      // }
      // console.log(this.user)
    })
  }
  

  getMessages() {
    this.http.get(this.server+"/messages").subscribe((response) => {
      this.messages = response
      // for(let i in response){
      //   this.userObject[response[i]._id] = response[i]
      // }
      console.log(this.messages)
    })
  }
  constructor(private http: HttpClient) { 
    this.getUser()
    this.getMessages()
  }
  
}
