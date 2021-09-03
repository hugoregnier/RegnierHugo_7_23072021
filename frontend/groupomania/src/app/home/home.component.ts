import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 

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
