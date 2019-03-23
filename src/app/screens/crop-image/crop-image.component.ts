import { CropperComponent } from 'angular-cropperjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { FileModel } from 'src/app/shared/models/FileModel';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { ConvertPropertyBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

const sizeOf = require('image-size');

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit, AfterViewInit {

  fileModel: FileModel;
  imageWidth: number;
  imageHeight: number;
  @ViewChild('targetDiv') targetDiv: ElementRef;
  @ViewChild('cropper') public angularCropper: CropperComponent;

  config: any = {
    minCropBoxWidth: 64,
    minCropBoxHeight: 64,
    movable: false,
    scalable: false,
    zoomable: true,
    rotatable: false,
    viewMode: 2,
    autoCropArea: 0.5
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService
  ) {
    this.fileModel = localStorage.getFileModel();
  }

  ngOnInit() {
    const dimensions = sizeOf(this.fileModel.path);
    this.imageWidth = dimensions.width;
    this.imageHeight = dimensions.height;

    this.onResize();
    // this.changeDetector.detectChanges();
  }

  ngAfterViewInit(): void {
    
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.renderer.setStyle(this.targetDiv.nativeElement, "height", (window.innerHeight - 145) + "px");
  }
}
