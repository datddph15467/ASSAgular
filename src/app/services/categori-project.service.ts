import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from '../models/Categories';

const apiUrl = "http://localhost:3000/categoriesProjects";
@Injectable({
  providedIn: 'root'
})
export class CategoriProjectService {
  constructor ( private http: HttpClient) {}

    getAllProducts(): Observable<ICategories[]> {
        return this.http.get<ICategories[]>(apiUrl);
    }
    // lấy toàn bộ sản phẩm 

    getProduct(id: number | string): Observable<ICategories> {
        return this.http.get<ICategories>(`${apiUrl}/${id}`);
    }
    // lấy dữ liệu theo từng id
    addProduct(product: ICategories): Observable<ICategories> {
        return this.http.post<ICategories>(apiUrl, product);
    }
    //thêm sản phẩm 
    updateProduct(product: ICategories): Observable<ICategories> {
        return this.http.put<ICategories>(`${apiUrl}/${product.id}`, product);
    }
    // cập nhận sản phẩm
    removeProduct(id: number | string): Observable<ICategories> {
        return this.http.delete<ICategories>(`${apiUrl}/${id}`);
    }
    // xóa sản phẩm 
}
