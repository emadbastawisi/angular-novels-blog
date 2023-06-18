import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  featuredPostArray:Array<object> | any = [];
  latestPostArray:Array<object> | any = [];

  constructor(private postService:PostService ) { }
  ngOnInit(): void {
    this.postService.loadLatest().subscribe(data => {
      this.latestPostArray = data;
    });
    this.postService.loadFeatured().subscribe(data => {
      this.featuredPostArray = data;
    });
    
  }
}
