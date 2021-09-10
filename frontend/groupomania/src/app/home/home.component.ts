import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // toto:string = "kkrkr"
  title:string = ""
  content:string = ""
  error:any
  message:string = ""
  comment:string = ""

  

  convertDateTime(date: string | number | Date) {
    function pad(s: string | number) {
        return (s < 10) ? "0" + s : s;
    }
    let d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/') + ' à ' + [pad(d.getHours()), pad(d.getMinutes() + 1)].join(':')
}



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

  // createComment() {
  //   // console.log(this.title, this.content)
  //   this.data.createComment(this.comment)
  //   .then(res=>{
  //     if(res===true){
  //       this.comment = ""
  //     }
  //   })
  //   .catch(err=>{
  //     this.error = err
  //     console.log(this.error)
  //   })
  // }

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
