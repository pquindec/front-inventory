import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private CategoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>()

  getCategories(){
    this.CategoryService.getCategories()
    .subscribe((data:any) => {
      console.log("Respuesta categories", data)
      this.listarCategoryResponses(data)
    }, (error:any) => {
      console.log("Error", error)
    })
  }

  listarCategoryResponses(res:any){

    const dataCategory: CategoryElement[] = []

    if(res.metadata[0].code=="200"){
      let listCategory = res.categoryResponse.category;

      listCategory.forEach((category: CategoryElement) => {
        dataCategory.push(category);
      })
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory)
    }

  }

}

export interface CategoryElement{
description:string;
id : number;
name: string;
}
