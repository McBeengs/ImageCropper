import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

const remote = require('electron').remote;
const fs = remote.require('fs');

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit {

  path: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    // this.path = this.route.snapshot.paramMap.get('path');
    this.path = "D:\\Windows\\Desktop\\ps3\\";

  }

  ngOnInit() {
    const filelist: Array<string> = new Array<string>();
    this.parseDirectory(filelist);

    filelist.forEach(file => {
      console.log(file);
    });
  }

  parseDirectory(filelist: Array<string>): Array<string> {
    fs.readdir(this.path, (error: any, files: string[]) => {
      filelist = filelist || [];
      files.forEach((file: any) => {
        if (fs.statSync(this.path + file).isDirectory()) {
          filelist = this.parseDirectory(filelist);
        }

        filelist.push(this.path + file);
        console.log(this.path + file);
      });
    });

    return filelist;
  }
}
