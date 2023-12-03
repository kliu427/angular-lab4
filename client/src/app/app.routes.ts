import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninComponent } from './signin/signin.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'createaccount', component: CreateaccountComponent}


];
