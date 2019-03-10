import { HomeComponent } from './screens/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';

import { AppHeaderModule } from '@coreui/angular';
import { SelectImageComponent } from './screens/select-image/select-image.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectImageComponent
  ],
  imports: [
    AppHeaderModule,
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
