import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { NotelistComponent } from './component/notelist/notelist.component';
import { ForgotPasswordComponent } from 'src/app/component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

export const appRoutes: Routes = [
  {path:'reset-password/:id', component:ResetPasswordComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'notelist',component: NotelistComponent},
  {path:'forgot-password' ,component:ForgotPasswordComponent},
  { path: '**', redirectTo:'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
