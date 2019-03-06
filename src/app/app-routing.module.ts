import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { NotelistComponent } from './component/notelist/notelist.component';
import { ForgotPasswordComponent } from 'src/app/component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { AuthGuardService as AuthGuard } from './core/services/AuthServices/auth-guard.service';
import { ArchiveComponent } from 'src/app/component/archive/archive.component';
import { ThrashComponent } from 'src/app/component/trash/thrash.component';
import { EditLabelComponent } from './edit-label/edit-label.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      
      { path: '', redirectTo: 'notelist', pathMatch: 'full' },
      { path: 'notelist', component: NotelistComponent },
      { path: 'trash', component: ThrashComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'edit-label', component: EditLabelComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
