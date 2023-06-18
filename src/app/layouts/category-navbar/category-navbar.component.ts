import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  categoryArray:Array<object> | any = [];

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(data => {
      this.categoryArray = data;
    }
    );
  }
}
