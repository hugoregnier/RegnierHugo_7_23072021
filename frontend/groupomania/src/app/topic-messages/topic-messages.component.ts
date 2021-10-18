import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-messages',
  templateUrl: './topic-messages.component.html',
  styleUrls: ['./topic-messages.component.css']
})
export class TopicMessagesComponent implements OnInit {

  content: string = ""
  error: any
  message: string = ""
  comment: string = ""
  currentTopic: any




  convertDateTime(date: string | number | Date) {
    function pad(s: string | number) {
      return (s < 10) ? "0" + s : s;
    }
    let d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/') + ' à ' + [pad(d.getHours()), pad(d.getMinutes() + 1)].join(':')
  }



  createPost() {
    this.data.createMessage(this.content, this.route.snapshot.paramMap.get('id'))
      .then(res => {
        if (res === true) {
          this.message = "message poster !"
          this.content = ""
        }
      })
      .catch(err => {
        this.error = err
        console.log(this.error)
      })
  }

  deletePost(id: any) {
    this.data.deleteMessage(id)
      .then(res => {
        if (res === true) {
          this.data.getMessages(this.route.snapshot.paramMap.get('id'))
          for (let topic of this.data.topics) {
            if (topic.id == this.route.snapshot.paramMap.get('id')) {
              this.currentTopic = topic
            }
          }
        }
      })
      .catch(err => {
        this.error = err
        console.log(this.error)
      })
  }


  constructor(
    public data: DataService
    , private router: Router
    , private route: ActivatedRoute
  ) {
    if (!this.data.authToken) {
      this.router.navigate(['/login']);
    }
    this.data.getMessages(this.route.snapshot.paramMap.get('id'))
    for (let topic of this.data.topics) {
      if (topic.id == this.route.snapshot.paramMap.get('id')) {
        this.currentTopic = topic
      }
    }
    console.log(this.currentTopic);

  }

  ngOnInit(): void {
  }

}
