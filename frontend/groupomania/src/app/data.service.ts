import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }

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
