import { Component } from '@angular/core';
import fs from 'fs'; 


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})


export class HomePageComponent{
  superheroInfo = JSON.parse(fs.readFileSync('../server/superhero_info.json', 'utf8'));
  superheroPowers = JSON.parse(fs.readFileSync('../server/superhero_powers.json', 'utf8'));  

  


  test(){
    alert("asldjklkasdj;flkasd")
  }
}
