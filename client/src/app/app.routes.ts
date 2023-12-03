import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { SigninComponent } from './signin/signin.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'signin', component: SigninComponent},
    {path: 'createaccount', component: CreateaccountComponent}

];
