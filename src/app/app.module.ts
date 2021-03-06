import { AppComponent } from './app.component';
import { AppHeaderModule } from '@coreui/angular';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CropImageComponent } from './screens/crop-image/crop-image.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './screens/home/home.component';
import { ImageThumbnailComponent } from './screens/select-media/components/image-thumbnail.component';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalStorageService } from './shared/services/local-storage.service';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { SelectMediaComponent } from './screens/select-media/select-media.component';

@NgModule({
  declarations: [
    SafeUrlPipe,
    AppComponent,
    HomeComponent,
    SelectMediaComponent,
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
    })
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
