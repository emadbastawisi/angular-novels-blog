import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  postData: any;
  simmilarPostsArray: any;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postService.countViews(params['id']);
      this.postService.loadSinglePost(params['id']).subscribe(post => {
        this.postData = post;
        this.loadRelatedPosts(this.postData.category.categoryId)
      }
      )
    })
  }

  loadRelatedPosts(categoryId: string | undefined) {
    this.postService.loadRelatedPosts(categoryId).subscribe(posts => {
      this.simmilarPostsArray = posts;
    }
    )

  }
}