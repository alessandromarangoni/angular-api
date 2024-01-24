import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.scss'
})
export class SingleBookComponent implements OnInit{
  private googleurl = 'https://www.googleapis.com/books/v1/volumes?q=';

  libro : any 
  cover : any

  constructor(
    private readonly bookService: BookServiceService,
    private readonly router : Router,
    private readonly route: ActivatedRoute,

  ){}
  ngOnInit(): void {
   this.getBook()
  }

  getBook() {
    // Utilizza params per ottenere i parametri della rotta
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Parametro "id":', id);
      this.bookService.getSingleBook(id).subscribe(data => {
        console.log(data)
        this.libro = data;
        console.log(this.libro)
        this.getCover()
      })
    });
  }
  getCover(){
    this.bookService.http.get<any[]>(this.googleurl + this.libro.name).subscribe(data => {
      // console.log(data);
      //assegno dati all array covers
      this.cover = data;
      this.cover = this.cover.items[0].volumeInfo.imageLinks.thumbnail
      console.log(this.cover)
  })
}
}
