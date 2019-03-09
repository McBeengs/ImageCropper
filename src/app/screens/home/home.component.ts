import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.title = "App name here!";
  }

  ngOnInit() {
  }

  routeDemonstration() {
    this.router.navigate(["/action"], { relativeTo: this.route });
  }
}
