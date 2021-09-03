import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title:string = ""
  content:string = ""
  error:any
  message:string = ""


  createPost() {
    // console.log(this.title, this.content)
    this.data.createMessage(this.title, this.content)
    .then(res=>{
      if(res===true){
        this.message = "message poster !"
        this.title = ""
        this.content = ""
      }
    })
    .catch(err=>{
      this.error = err
      console.log(this.error)
    })
  }

  constructor(
    public data: DataService
    ,private router: Router
  ) {
    if(!this.data.authToken){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
