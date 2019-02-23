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
// import { HttpRequest } from 'src/app/component/forgot-password/forgot-password.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,UserComponent, 
    NotelistComponent, ForgotPasswordComponent, ResetPasswordComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    AppMaterialModule,
    BrowserAnimationsModule
  ],
 
  exports: [
    AppMaterialModule
  ],
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }