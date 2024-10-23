import { Routes } from '@angular/router';
import { RegistrationComponent } from './Pages/registration/registration.component';
import { CreationComponent } from './Pages/creation/creation.component';
import { DetailComponent } from './Pages/detail/detail.component';
import { ListComponent } from './Pages/list/list.component';
import { LoginComponent } from './Pages/login/login.component';
import { EditseventComponent } from './Pages/editsevent/editsevent.component';


export const routes: Routes = [
  { 
    path: '', component: LoginComponent 
  },
  // { path: 'creation', redirectTo: '/creation', pathMatch: 'full' },
    {
    path: 'registration',
    component: RegistrationComponent
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  
  {
    path: 'creation',
    component: CreationComponent
  },
  { path: 'creation', redirectTo: '/creation', pathMatch: 'full' },
  {
    path: 'details/:id',
    component: DetailComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  { path: 'list', redirectTo: '/list', pathMatch: 'full' },
  {
    path: "editsevent/:id",
    component: EditseventComponent
  }
];
