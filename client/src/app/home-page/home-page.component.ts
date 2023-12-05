import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})


export class HomePageComponent{
  name: string = '';
  race: string = '';
  power: string = '';
  publisher: string = '';
  searchResults: any[] = [];

  constructor(private http: HttpClient) {}

  searchSuperheroes() {
    this.http.get<any[]>(`/api/superheroes/search/${this.name}/${this.race}/${this.power}/${this.publisher}`)
      .subscribe((data) => {
        this.searchResults = data; 
      });
  }
  test(){
    alert("asldjklkasdj;flkasd")
  }
}
