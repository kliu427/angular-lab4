import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    { provide: HttpClient, useFactory: withFetch }
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})


export class HomePageComponent{
  name: String = '';
  race: String = '';
  power: String = '';
  publisher: String = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/api/superheroes/search'

  test(){
    alert("asldjklkasdj;flkasd")

  }

  searchSuperheroes() {
    const body = {
      name: this.name,
      race: this.race,
      power: this.power,
      publisher: this.publisher
    };
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    this.http.post<any[]>(this.url, body, httpOptions)
      .subscribe((data) => {
        this.searchResults = data; 
      });
  }

}
