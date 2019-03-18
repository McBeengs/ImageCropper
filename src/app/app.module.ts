import { AppComponent } from './app.component';
import { AppHeaderModule } from '@coreui/angular';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CropImageComponent } from './screens/crop-image/crop-image.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './screens/home/home.component';
import { ImageThumbnailComponent } from './screens/select-image/components/image-thumbnail.component';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NgModule } from '@angular/core';
import { NgxCroppieModule } from 'ngx-croppie';
import { SelectImageComponent } from './screens/select-image/select-image.component';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectImageComponent,
    CropImageComponent,
    ImageThumbnailComponent
  ],
  entryComponents: [
    ImageThumbnailComponent
  ],
  imports: [
    FormsModule,
    AppHeaderModule,
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    NgxCroppieModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
