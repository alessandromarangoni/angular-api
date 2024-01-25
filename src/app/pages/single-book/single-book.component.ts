import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../bookInterface';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrl: './single-book.component.scss'
})
export class SingleBookComponent implements OnInit{
  //url x google api
  private googleurl = 'https://www.googleapis.com/books/v1/volumes?q=';

  //dichiaro variabili
  googleLibro :any
  libri : Book[] = [];
  cover : any
  urlLibro! : string

  //nel costruttore inietto il service, router, e activatedRoute che mi serve per prendere i params
  constructor(
    private readonly bookService: BookServiceService,
    private readonly router : Router,
    public http: HttpClient,
    private readonly route: ActivatedRoute,
  ){}

  //al mounted lancio getBook che a sua volta chiama getcover
  ngOnInit(): void {
   this.getBook()
  }

  getBook() {
      // Utilizzo params per ottenere i parametri della rotta
    this.route.params.subscribe(params => {
      //assegno il params come id
      const id = params['id'];
      // console.log('Parametro "id":', id);
      // Richiamo la funzione del servizio che mi restituisce il libro
      this.bookService.getSingleBook(id).subscribe(data => {
        // console.log(data)
        //assegno i dari ricavati a libro
        this.libri = data;
        //console.log(this.libro)
        //qui chiamo la funzione per prendere cover e url altrimenti li renderizza troppo tardi
        this.getCover(this.libri);
      })
    });
  }

  getCover(book: any){
    //da sistemare qui ho dovuto rendere pubblico http ma è una schifezza
    //fatto per usare l http.get
    this.http.get<any[]>(this.googleurl + book.name).subscribe(data => {
      //assegno dati di risposta all array googleLibro
      this.googleLibro = data;
      //console.log(this.googleLibro)
      // assegno l url a urlLibro che stava in googleLibro.items[0].volumeInfo
      this.urlLibro = this.googleLibro.items[0].volumeInfo.infoLink
      // assegno l img a cover che stava in googleLibro.items[0].volumeInfo.imageLinks
      // this.cover = this.googleLibro.items[0].volumeInfo.imageLinks.thumbnail
      this.cover = this.googleLibro.items.find((c: { volumeInfo: { title: string; }; }) =>
      c.volumeInfo.title.trim().toLowerCase().includes(book.name.toLowerCase()));

      console.log(this.cover)
  })
}
}
