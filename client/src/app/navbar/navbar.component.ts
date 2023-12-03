import { Component } from '@angular/core';

import {Router} from '@angular/router'
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}
  gohome(): void{
    this.router.navigate(['/']);
  }
  createaccount(): void{
    this.router.navigate(['/createaccount']);
  }
  signin(): void{
    this.router.navigate(['/signin']);
  }
}
