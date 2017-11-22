import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  constructor() { }

  rancherUrl = 'http://tcl1:8080';
  
  ngOnInit() {
  }

}
