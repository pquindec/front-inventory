import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  /*
  Get all categories
  */

  getCategories(){

    const endpoint = `${base_url}/categories`

    return this.http.get(endpoint)

  }

   /*
  save categories
  */

  saveCategories(body: any) {
  const endpoint = `${base_url}/categories`

  return this.http.post(endpoint, body)


  }

  /*
  update categories
  */

  updateCategory(body: any, id: any) {
    const endpoint = `${base_url}/categories/${id}`
    return this.http.put(endpoint, body)
  }

   /*
  delete categories
  */

  deleteCategory(id: any) {
    const endpoint = `${base_url}/categories/${id}`
    return this.http.delete(endpoint)
  }

     /*
  search categories
  */

  getCategoryById(id: any) {
    const endpoint = `${base_url}/categories/${id}`
    return this.http.get(endpoint)
  }

}
