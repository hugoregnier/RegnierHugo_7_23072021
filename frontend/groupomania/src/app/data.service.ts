import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  server = "http://localhost:3000/api"
  userId: any;
  messages: any;
  topics: any;
  authToken: any;
  isAuth$ = new BehaviorSubject<boolean>(false);
  username : any;
  // bcrypt: any;
  profil = Object();



  secureget(route:string, callback:any){
    this.http.get(route, { headers: { 'Authorization': this.authToken }}).subscribe(callback)
  }

  getUsername() {
    this.secureget(this.server+"/user/me", (response:any) => {
      this.username = response.username;
      console.log(this.username)
    })
  }

  readUser() {
    this.secureget(this.server+"/user/me", (response:any) => {
      this.profil = response;

      console.log(this.profil)
    })
  }

  modifyUser(email: string, username: string , password: string, bio: string) {
    return new Promise((resolve, reject) => {
    this.http.put(this.server+"/user/me", {email, username, password, bio}, { headers: { 'Authorization': this.authToken }}).subscribe(
      (response:any) => {
        this.profil.email = response.email
        this.profil.username = response.username
        this.profil.password = response.password
        this.profil.bio = response.bio
        // this.userId = response.userId;
        resolve(true);
      },
      (error) => {
        reject(error);
      }
      );
    });
  }

  deleteUser(email: string, username: string , password: string, bio: string) {
    return new Promise((resolve, reject) => {
    this.http.put(this.server+"/user/sup", {email, username, password, bio}, { headers: { 'Authorization': this.authToken }}).subscribe(
      (response:any) => {
        this.profil.email = response.email
        this.profil.username = response.username
        this.profil.password = response.password
        this.profil.bio = response.bio
        // this.userId = response.userId;
        resolve(true);
      },
      (error) => {
        reject(error);
      }
      );
    });
  }

  // readUser(email: string, username: string , password: string, bio: string) {
  //   return new Promise((resolve, reject) => {
  //     this.http.get(this.server+"/user/me", {email: email, username: username, password: password, bio: bio}).subscribe(
  //       (response:any) => {
  //         // this.userId = response.userId;
  //         resolve(true);
  //       },
  //       (error) => {
  //         reject(error);
  //       }
  //     );
  //   });
  // }

  createUser(email: string, username: string , password: string, bio: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.server+"/user/register", {email: email, username: username, password: password, bio: bio}).subscribe(
        (response:any) => {
          // this.userId = response.userId;
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


  loginUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(this.server+"/user/login", {email: email, password: password}).subscribe(
        (response:any) => {
          this.userId = response.userId;
          this.authToken = response.token;
          // this.bcrypt = response.bcrypt;
          this.isAuth$.next(true);

          this.getUsername()
          this.readUser()
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  createMessage(content: string, topicId:any) {
    // console.log(title, content, this.authToken, this.server)
    return new Promise((resolve, reject) => {
      this.http.post(this.server+"/messages/new", {content: content, topicId: topicId},{ headers: { 'Authorization': this.authToken }}).subscribe(
        (response:any) => {
          this.getMessages(topicId)
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  

  getMessages(id:any) {
    this.http.post(this.server+"/messages", {topicId: id}).subscribe((response) => {
      this.messages = response
      // for(let i in response){
      //   this.userObject[response[i]._id] = response[i]
      // }
      console.log(this.messages)
    })
  }


  createTopic(title: string, content: string) {
    // console.log(title, content, this.authToken, this.server)
    return new Promise((resolve, reject) => {
      this.http.post(this.server+"/topics/new", {title: title, content: content},{ headers: { 'Authorization': this.authToken }}).subscribe(
        (response:any) => {
          this.getTopics()
          resolve(true);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getTopics() {
    this.http.get(this.server+"/topics").subscribe((response) => {
      this.topics = response
      // for(let i in response){
      //   this.userObject[response[i]._id] = response[i]
      // }
      console.log(this.topics)
    })
  }

  logout() {
    this.authToken = null;
    this.userId = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }






  constructor(private http: HttpClient, private router: Router) { 
    this.getTopics()
  }
  
}
