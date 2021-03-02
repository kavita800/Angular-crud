import { Component, OnInit } from '@angular/core';
import { PostService } from '../../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
  
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
   
  id: number;
  post: any;
   
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
   ) { }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
      this.post = this.postService.find(this.id);
  }
  
}