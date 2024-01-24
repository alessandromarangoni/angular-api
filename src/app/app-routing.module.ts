import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';

const routes: Routes = [
  { path: '', component : BookComponent },
  { path: 'book/:id', component : SingleBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
