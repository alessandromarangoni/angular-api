import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private url = 'https://www.anapioficeandfire.com/api/books';
  book! :number 

  constructor(public http: HttpClient) {}

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  // nextPage(){
  //   this.page ++ 
  //   this.getBooks()
  // }
}
