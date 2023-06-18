import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit{
  postsArray:Array<object> | any= [];  
  category: any = {};
constructor(private route: ActivatedRoute ,private postService:PostService) { }
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.category = params.get('category');
   this.postService.loadCategoryPosts(params.get('id')).subscribe(data => {
      this.postsArray = data;
    })
  }
  );
}
}
