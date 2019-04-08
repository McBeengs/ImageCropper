import Cropper from 'cropperjs/dist/cropper.esm.js';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { FileModel } from 'src/app/shared/models/FileModel';
import { LocalStorageService } from './../../shared/services/local-storage.service';

const sizeOf = require('image-size');
const remote = require('electron').remote;
const fs = remote.require('fs');
const resizeImg = require('resize-img');

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.css']
})
export class CropImageComponent implements OnInit, AfterViewInit {

  fileModel: FileModel;
  imageWidth: number;
  imageHeight: number;
  cropBoxW: number;
  cropBoxH: number;
  @ViewChild('targetDiv') targetDiv: ElementRef;
  @ViewChild('cropBoxWidth') cropBoxWidth: ElementRef;
  @ViewChild('cropBoxHeight') cropBoxHeight: ElementRef;
  @ViewChild('eqSquaresCheckbox') eqSquaresCheckbox: ElementRef;
  @ViewChild('radioFieldset') radioFieldset: ElementRef;
  @ViewChild('outputPath') outputPath: ElementRef;

  cropper: Cropper;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private electronService: ElectronService,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService
  ) {
    this.fileModel = localStorage.getFileModel();
  }

  ngOnInit() {
    const dimensions = sizeOf(this.fileModel.path);
    this.imageWidth = dimensions.width;
    this.imageHeight = dimensions.height;
    this.cropBoxW = 128;
    this.cropBoxH = 128;

    const path = this.fileModel.path.substring(0, this.fileModel.path.lastIndexOf("\\")) + "\\default.png";
    this.outputPath.nativeElement.value = path;

    this.onResize();
  }

  ngAfterViewInit(): void {
    const img = this.targetDiv.nativeElement.querySelector('img');

    this.cropper = new Cropper(img, {
      viewMode: 1,
      autoCropArea: 0.5,
      rotatable: false,
      scalable: false,
      minCropBoxWidth: 64,
      minCropBoxHeight: 64,
      preview: ".preview",
      ready: (event) => {
        this.changeCropBoxSize();
      }
    });

    img.addEventListener('cropend', (event) => {
      if (this.eqSquaresCheckbox.nativeElement.checked) {
        this.changeCropBoxSize();
      }
    });

    img.addEventListener('cropmove', (event) => {
      const data = this.cropper.getCropBoxData();

      if (this.eqSquaresCheckbox.nativeElement.checked) {
        data.height = data.width;
      }
      this.cropBoxW = Math.round(+data.width);
      this.cropBoxH = Math.round(+data.height);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.renderer.setStyle(this.targetDiv.nativeElement, "height", (window.innerHeight - 145) + "px");
  }

  changeCropBoxSize() {
    this.cropper.setCropBoxData({
      x: 0,
      y: 0,
      width: +this.cropBoxWidth.nativeElement.value,
      height: +this.cropBoxHeight.nativeElement.value,
      rotate: 0,
      scaleX: 1,
      scaleY: 1
    });
  }

  eqSquaresChecked() {
    if (this.eqSquaresCheckbox.nativeElement.checked) {
      this.cropBoxH = this.cropBoxW;
      this.changeCropBoxSize();
    }
  }

  selectDirectory() {
    if (this.electronService.isElectronApp) {
      const path = this.electronService.remote.dialog.showOpenDialog(null, {
        defaultPath: "default.png",
        properties: ['openFile']
      })[0];

      this.outputPath.nativeElement.value = path;
    }
  }

  cropClick() {
    const radio = this.radioFieldset.nativeElement.querySelector("input[type='radio']:checked");

    const canvas = this.cropper.getCroppedCanvas({
      minWidth: radio.value,
      minHeight: radio.value,
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high'
    });

    const image = new Image();
    image.src = canvas.toDataURL("image/png");

    if (this.electronService.isElectronApp) {
      const base64Data = image.src.replace(/^data:image\/png;base64,/, "");

      resizeImg(Buffer.from(base64Data, 'base64'), { width: +radio.value, height: +radio.value }).then((buf) => {
        fs.writeFileSync(this.outputPath.nativeElement.value, buf);

        alert("Crop successfully created!");
        this.router.navigate(['/home']);
      });
    }
  }
}
