import { ActionComponent } from './screens/action/action.component';
import { HomeComponent } from './screens/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';

import { AppHeaderModule } from '@coreui/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ActionComponent
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
