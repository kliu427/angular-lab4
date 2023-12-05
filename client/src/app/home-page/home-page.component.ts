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
  items: string[] = [];  

  searchSuperheroes() {
    const searchResults = document.getElementById("search_results");
    if (!searchResults) return;

    searchResults.textContent = '';
    const searchName = document.getElementById("name_input") as HTMLSelectElement;
    const searchRace = document.getElementById("search_criteria") as HTMLSelectElement;
    const searchPowers = document.getElementById("search_input") as HTMLInputElement;
    const searchPub = document.getElementById("number_of_results") as HTMLInputElement;

    const name = searchName.textContent;
    const race = searchRace.textContent;
    const powers = searchPowers.textContent;
    const publisher = searchPub.textContent;


    let path = `/api/superheroes/search/${name}/${race}/${powers}/${publisher}`;

    if (!path) return;

    fetch(path)
        .then(res => res.json()
            .then((data: string[]) => {
                const searchResultsElement = document.getElementById("search_results");
                if (!searchResultsElement) return;

                data.forEach(e => {
                    const hero = document.createElement('li');
                    hero.appendChild(document.createTextNode(`${e}`));
                    searchResultsElement.appendChild(hero);
                });
            })
        );
}
  test(){
    alert("asldjklkasdj;flkasd")
  }
}
