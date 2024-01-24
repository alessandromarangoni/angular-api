import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { BookComponent } from './pages/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './section/header/header.component';
import { SingleBookComponent } from './pages/single-book/single-book.component';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HeaderComponent,
    SingleBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
