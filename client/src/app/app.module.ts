import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatButtonModule} from '@angular/material/button'; 
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { withFetch } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,    
    HomePageComponent,
    NavbarComponent,
    
  ],
  imports: [    
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([]),
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HttpClient, useFactory: withFetch }],
  bootstrap: [AppComponent]
})
export class AppModule { }
