import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
// export const routes: Routes = [
//     {path:'', component: HomeComponent},
//     {path:'details', component: DetailsComponent},
//     {path:'about', component: AboutComponent},
//     {path:'contact', component: ContactComponent},
//     {path:'admin', component: AdminComponent },
//     {path:'sign-in', component:SignInComponent},
//     {path:'**', component: NotFoundComponent }
// ];
export const routes: Routes = [
  // routes with layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'admin', component: AdminComponent },
    ]
  },

  // routes without layout
  { path: 'sign-in', component: SignInComponent },

  // 404 fallback
  { path: '**', component: NotFoundComponent }
];
