import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { ItemsFormComponent } from './components/items-form/items-form.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "signup",
        component: SignUpComponent
    },
    {
        path: "items",
        component: ListItemsComponent
    },
    {
        path: '',
        redirectTo: '/items',
        pathMatch: 'full'
    },
];
