import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  server = "http://localhost:3000/api"
  user = Object()
  

  getUser() {
    this.http.get(this.server+"/user/me").subscribe((response) => {
      this.user = response
      console.log(this.user);
      
    })
  }


  constructor(private http: HttpClient) { 
    this.getUser()
  }
}
