import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegisterComponent } from './component/register/register.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {AppMaterialModule} from './app.material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from 'src/app/component/user/user.component';
import { NotelistComponent } from 'src/app/component/notelist/notelist.component';
import { ForgotPasswordComponent } from 'src/app/component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/component/reset-password/reset-password.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';
import { UserService } from './component/user/user.service';
import { NoteCreateComponent } from 'src/app/component/note-create/note-create.component';
// import { HttpRequest } from 'src/app/component/forgot-password/forgot-password.component'

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,UserComponent, 
    NotelistComponent, ForgotPasswordComponent, ResetPasswordComponent, NoteCreateComponent

  ],
 
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,JwtModule.forRoot({
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
  providers: [UserService
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }