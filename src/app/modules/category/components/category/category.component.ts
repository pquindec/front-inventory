import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              public dialog: MatDialog, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>()

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(){
    this.categoryService.getCategories()
    .subscribe((data:any) => {
      console.log("Respuesta categories", data)
      this.listarCategoryResponses(data)
    }, (error:any) => {
      console.log("Error", error)
    })
  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;

    }

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

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1){
        this.openSnackBar("Guardado", "Correcto");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("No se pudo guardar", "Error");
      }


  })
  }

  edit(id: number, name: string, description: string) {
    const dialogRef = this.dialog.open(NewCategoryComponent , {
      width: '450px',
      data: {
        id: id, name: name, description: description}

    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1){
        this.openSnackBar("Actualizado", "Correcto");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("No se pudo actualizar", "Error");
      }


  })

  }

  delete(id: number) {
    const dialogRef = this.dialog.open( ConfirmComponent , {
      data: {id: id}

    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1){
        this.openSnackBar("Eliminado", "Correcto");
        this.getCategories();
      }else if (result == 2){
        this.openSnackBar("No se pudo eliminar", "Error");
      }


  })

  }

  buscar( termino: string){

    if( termino.length === 0){
      return this.getCategories();
    }

    this.categoryService.getCategoryById(termino)
            .subscribe( (resp: any) => {
              this.processCategoriesResponse(resp);
            })
  }


  openSnackBar( message:string, actions:string): MatSnackBarRef<SimpleSnackBar> {

    return this.snackBar.open(message, actions,{
      duration: 2000.
    })
  }

}

export interface CategoryElement{
description:string;
id : number;
name: string;
}
