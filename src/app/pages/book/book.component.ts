import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
  books: any; 
  private googleurl = 'https://www.googleapis.com/books/v1/volumes?q=';
  covers: any;

  constructor(
    private readonly bookService: BookServiceService, 
    private readonly router : Router
  ) {}

  ngOnInit(): void {
    // Recupero libri
    this.bookService.getBooks().subscribe(data => {
      console.log(data);
      //assegno i dati ricavati alla variavile books
      this.books = data;
      //ciclo su ogni libro (element e chiama la funzione usando il libro.name)
      this.books.forEach((element: any) => {
        this.getCover(element.name)
      });
    });
  }

  // ottengo cover dal titolo
  getCover(titolo: string): void {
    //chiamata api con titolo annesso
    this.bookService.http.get<any[]>(this.googleurl + titolo).subscribe(data => {
      console.log(data);
      //assegno dati all array covers
      this.covers = data;

      // Verifica se ci sono risultati 
      if (this.covers.items && this.covers.items.length > 0) {
        // ciclo su libri
        this.books.forEach((obj: any) => {
                        //cerco in covers se books.name == items.volumeInfo.title
          const cover = this.covers.items.find((c: { volumeInfo: { title: any; }; }) => c.volumeInfo.title === obj.name);
          //se si
          if (cover) {
            //assegno proprietà cover
            obj.img = cover.volumeInfo.imageLinks.thumbnail;
          }
        });
      }
    });
  }

  //per andare alla rotta singleBook ho bisogno di un paramtero
  //visto che nell api non hanno un id univoco i libri 
  //ho preso l ultimo carattere della stringa ricavata dalla proprieta link 
  //e lo uso per navigare verso quella rotta nel mio sistema oltre che a riusarlo per la chiamata in singleBook
  //*****essendoci solo dieci record si può fare cosi ma è una porcata (chiedere consiglio per eventuali soluz alternative) *******/
  goToSingleBook(url : string){
    let id = url.charAt(url.length - 1);
    if(id == '0'){
      id = '10'
    }
    this.router.navigate(['/book', id]);
  }

}
