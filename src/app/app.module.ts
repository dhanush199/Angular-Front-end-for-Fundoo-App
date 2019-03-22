import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppMaterialModule } from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotelistComponent } from 'src/app/component/notelist/notelist.component';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { NoteCreateComponent } from 'src/app/component/create-note/note-create.component';
import { UpdateNoteComponent } from 'src/app/component/update-notes/update-notes.component';
import { ArchiveComponent } from 'src/app/component/archive/archive.component';
import { ThrashComponent } from 'src/app/component/trash/thrash.component';
import { PinnedNotesComponent } from 'src/app/component/pinned-notes/pinned-notes.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogRef, MAT_DIALOG_DATA, MatIconModule } from '@angular/material';
import { NoteFilterPipe } from 'src/app/core/pipes/note-filter.pipe';
import { RegisterComponent } from './component/user-components/register/register.component';
import { ResetPasswordComponent } from './component/user-components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './component/user-components/forgot-password/forgot-password.component';
import { LoginComponent } from './component/user-components/login/login.component';
import { UserService } from './core/services/UserService/user.service';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { SideBarComponent } from './component/shared-components/side-bar/side-bar.component';
import { GridViewComponent } from './component/shared-components/grid-view/grid-view.component';
import { SearchPipePipe } from './core/pipes/search-pipe.pipe';
import { MainSearchPipe } from './core/pipes/main-search.pipe';
import { CollaboratorDialogBoxComponent } from './component/user-components/collaborator-dialog-box/collaborator-dialog-box.component';
import { EmailIdPipe } from './core/pipes/email-id.pipe';
import { ImageUploadComponent } from './component/image-upload/image-upload.component';
import { LabelDialogBoxComponent } from './component/label-dialog-box/label-dialog-box.component';
import { HoverDirective } from './hover.directive';
import { TrailComponent } from './trail/trail.component';
import { RemainderComponentComponent } from './component/remainder-component/remainder-component.component';
import { NoteSearchComponent } from './component/note-search/note-search.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoteFilterPipe,
    HomeComponent,
    NotelistComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NoteCreateComponent,
    UpdateNoteComponent,
    ArchiveComponent,
    ThrashComponent,
    SideBarComponent,
    PinnedNotesComponent,
    GridViewComponent,
    EditLabelComponent,
    LabelDialogBoxComponent,
    SearchPipePipe,
    MainSearchPipe,
    NoteSearchComponent,
    ImageUploadComponent,
    CollaboratorDialogBoxComponent,
    EmailIdPipe,
    HoverDirective,
    TrailComponent,
    RemainderComponentComponent,
  ],

  imports: [
    CommonModule, MatIconModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule, JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3080'],
        blacklistedRoutes: ['localhost:3080/auth/']
      }
    })
  ],


  exports: [
    AppMaterialModule
  ],
  entryComponents: [UpdateNoteComponent,
    LabelDialogBoxComponent,
    CollaboratorDialogBoxComponent,RemainderComponentComponent],

  providers: [UserService, HomeComponent,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },],

  bootstrap: [AppComponent]
})
export class AppModule {

}