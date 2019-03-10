import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('pathName') pathName: ElementRef;
  @ViewChild('nextButton') nextButton: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private electronService: ElectronService) { }

  selectDirectory() {
    if (this.electronService.isElectronApp) {
      const path = this.electronService.remote.dialog.showOpenDialog(null, {
        properties: ['openDirectory']
      })[0];

      this.pathName.nativeElement.value = path;
      this.nextButton.nativeElement.disabled = false;
    }
  }

  nextButtonClick() {
    this.router.navigate(['/select-image', this.pathName.nativeElement.value]);
  }
}
