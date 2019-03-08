import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatExpansionModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule, MatSidenavModule, MatListModule } from '@angular/material';
import { MatDividerModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [],
  imports: [MatNativeDateModule,
    MatSidenavModule, 
    MatListModule,
    CommonModule, 
    HttpClientInMemoryWebApiModule,
    MatSlideToggleModule,
    MatChipsModule,
     MatToolbarModule,
    MatFormFieldModule, 
    HttpClientModule,
     MatDividerModule,
    MatInputModule, 
    BrowserAnimationsModule, 
    MatSliderModule,
    MatOptionModule,
    MatDialogModule, 
    BrowserModule, 
    MatButtonToggleModule,
    MatSelectModule, 
    MatIconModule,
    MatCardModule, 
    MatMenuModule, 
    FlexLayoutModule, 
    MatExpansionModule
  ],
  exports: [MatNativeDateModule, 
    MatSidenavModule, 
    MatListModule, 
    FlexLayoutModule,
    HttpClientInMemoryWebApiModule,
     MatToolbarModule,
     MatSlideToggleModule,
    MatInputModule, 
    MatSliderModule,
    MatDialogModule, 
    MatIconModule, 
    BrowserAnimationsModule,
    MatButtonToggleModule,
    MatOptionModule,
    MatFormFieldModule, 
    HttpClientModule,
     MatDividerModule,
    MatSelectModule, 
    MatChipsModule,
    BrowserModule,
     MatMenuModule, 
     MatInputModule,
    MatCardModule,
     MatExpansionModule
  ],
})
export class AppMaterialModule { }
