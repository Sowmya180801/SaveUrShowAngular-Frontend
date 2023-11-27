import { Component,OnInit } from '@angular/core';
import { Feedback } from '../feedback';
import { FeedbackService } from '../feedback.service';
@Component({
  selector: 'app-showfeed',
  templateUrl: './showfeed.component.html',
  styleUrls: ['./showfeed.component.css']
})
export class ShowfeedComponent implements OnInit{
  feedbacks:Feedback[]=[];
  constructor(
    public feedbackService:FeedbackService
  ) { }

  ngOnInit(): void {
    this.feedbackService.getAll().subscribe((feedback: Feedback[])=>{
      this.feedbacks = feedback;
      console.log(this.feedbacks);
    }) 
   
  
}
}
