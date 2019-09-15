import { LocalStorageService } from './../../../shared/services/local-storage.service';
import {
  Component,
  HostBinding,
  Input,
  NgZone
  } from '@angular/core';
import { FileModel } from 'src/app/shared/models/FileModel';
import { Router } from '@angular/router';

@Component({
  selector: "app-image-thumbnail",
  template: `
    <div class="card" (click)="onClick()">
      <div class="card-body">
        <div id="thumbnail-container-{{model.id}}">
          <div class="thumb-wrapper">
            <img id="thumb-file-{{model.id}}" src="../../../../assets/spinner.gif" [lazyLoad]="model.path" class="file-thumbnail " />
          </div>
          <div class="thumb-info">
            <div class="thumb-info-value"><h6 class="d-inline">Name: </h6><p class="d-inline">{{model.name}}</p></div>
            <div class="thumb-info-value"><h6 class="d-inline">Date: </h6>
              <p class="d-inline">
                {{model.createDate | date: 'dd/MM/yyyy HH:mm:ss'}}
              </p>
            </div>
            <div class="thumb-info-value"><h6 class="d-inline">Size: </h6><p class="d-inline">{{model.sizeText}}</p></div>
          </div>
        </div>
      </div>
    </div>
    `,
  styles: [
    `
      .thumb-wrapper {
        width: 100%;
      }

      .file-thumbnail {
          max-width: 80%;
          max-height: 80%;
          display: inherit;
          margin: 0 auto;
      }

      .thumb-info {
        margin-top: 10px;
      }

      .thumb-info-value {
        margin-bottom: 7px;
      }

      .card:hover {
        background: #3c4956;
        cursor: pointer;
      }
      `
  ]
})
export class ImageThumbnailComponent {

  @Input() model: FileModel;
  // tslint:disable-next-line: no-input-rename
  @HostBinding('class') @Input('class') bootstrapCss = "col-sm-4 col-md-4 col-lg-3";

  constructor(private ngZone: NgZone, private router: Router, private localStorage: LocalStorageService) {
    if (this.model == null) {
      this.model = new FileModel();
    }
  }

  onClick() {
    this.localStorage.setFileModel(this.model);
    this.ngZone.run(() => this.router.navigate(['/crop-image'])).then();
  }
}
