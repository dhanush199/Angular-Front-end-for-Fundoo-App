import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { NotelistComponent } from './component/notelist/notelist.component';
import { AuthGuardService as AuthGuard } from './core/services/AuthServices/auth-guard.service';
import { ArchiveComponent } from 'src/app/component/archive/archive.component';
import { ThrashComponent } from 'src/app/component/trash/thrash.component';
import { RegisterComponent } from './component/user-components/register/register.component';
import { ResetPasswordComponent } from './component/user-components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './component/user-components/forgot-password/forgot-password.component';
import { LoginComponent } from './component/user-components/login/login.component';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';
import { NoteSearchComponent } from './component/note-search/note-search.component';
import { PinnedNotesComponent } from './component/pinned-notes/pinned-notes.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reset-password/:id', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [

      { path: '', redirectTo: 'noteretrieve', pathMatch: 'full' },
      { path: 'noteretrieve', component: NotelistComponent },
      { path: 'trash', component: ThrashComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: 'edit-label', component: EditLabelComponent },
      { path: 'pinned', component: PinnedNotesComponent },
      { path: 'search', component: NoteSearchComponent }
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'upload-photo', component: ImageUploadComponent },


  { path: '**', redirectTo: 'login' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
