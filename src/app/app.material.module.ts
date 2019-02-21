import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonToggleModule } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatIconModule} from '@angular/material/icon'; 
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserModule }    from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSliderModule} from '@angular/material/slider'; 
import {MatNativeDateModule, MatSidenavModule, MatListModule} from '@angular/material';
import {MatDividerModule} from '@angular/material';
import { MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [],
  imports: [MatNativeDateModule, MatSidenavModule, MatListModule,
    CommonModule,HttpClientInMemoryWebApiModule,MatToolbarModule,
    MatFormFieldModule,HttpClientModule,MatDividerModule,
    MatFormFieldModule,HttpClientModule,MatDividerModule,
   MatFormFieldModule,HttpClientModule,MatDividerModule,
    MatInputModule,BrowserAnimationsModule,MatSliderModule,
    MatOptionModule,
    MatDialogModule,BrowserModule,MatButtonToggleModule,
    MatSelectModule,MatIconModule,
    MatCardModule, MatMenuModule,FlexLayoutModule
  ],
  exports: [MatNativeDateModule, MatSidenavModule, MatListModule,FlexLayoutModule,
    MatFormFieldModule,HttpClientInMemoryWebApiModule,MatToolbarModule,
    MatInputModule,HttpClientModule,MatSliderModule,
    MatDialogModule,MatIconModule,BrowserAnimationsModule,
    MatFormFieldModule,HttpClientModule,MatDividerModule,MatButtonToggleModule,
    MatOptionModule,MatDividerModule,
    MatFormFieldModule,HttpClientModule,MatDividerModule,
    MatSelectModule,BrowserModule,MatMenuModule,MatInputModule,
    MatCardModule
  ],  
})
export class AppMaterialModule { }
