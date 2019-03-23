import { AngularCropperjsModule } from 'angular-cropperjs';
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
import { NgxElectronModule } from 'ngx-electron';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { SelectImageComponent } from './screens/select-image/select-image.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
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
    AngularCropperjsModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
