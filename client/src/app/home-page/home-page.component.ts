import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import fs from 'fs'; 


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})


export class HomePageComponent implements OnInit{
  superheroInfo = JSON.parse(fs.readFileSync('../../../server/superhero_info.json', 'utf8'));
  superheroPowers = JSON.parse(fs.readFileSync('../../../server/superhero_powers.json', 'utf8'));  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.findRaces();
  }

  async findPublishers(){
    
  }
  async findRaces(){
    
  }
  async findPowers(){
    
  }


  test(){
    alert("asldjklkasdj;flkasd")
  }
}
