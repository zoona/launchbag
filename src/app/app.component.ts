import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as io from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('scrollMe1') private myScrollContainer1: ElementRef;
  @ViewChild('scrollMe2') private myScrollContainer2: ElementRef;
  @ViewChild('scrollMe3') private myScrollContainer3: ElementRef;
  
  title = 'launchbag';
  message1: any;
  message2: any;
  message3: any;
  socket = io('http://tcl1:3000');
  finished1: boolean;
  finished2: boolean;
  finished3: boolean;
  constructor(private http: Http){}
  apiUrl = "http://tcl1:3000/api/";
  rancherUrl = 'http://tcl1:8080';
  jupyterUrl = 'http://tcl2:8888';
  kibanaUrl = "http://tcl2:5601/app/kibana#/dashboard/AV-R1w4qx1YW3m0zZ5qW?_g=(refreshInterval:('$$hashKey':'object:3758',display:'5%20seconds',pause:!f,section:1,value:5000),time:(from:now-15m,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,id:AV-R1FODx1YW3m0zZ5mT,panelIndex:1,row:1,size_x:6,size_y:3,type:visualization),(col:7,id:AV-R01pKx1YW3m0zZ5lE,panelIndex:2,row:1,size_x:6,size_y:3,type:visualization),(col:1,columns:!(customer_id,track_id,ismobile,listening_zip_code),id:AV-R1o4Nx1YW3m0zZ5pc,panelIndex:3,row:4,size_x:12,size_y:3,sort:!('@timestamp',desc),type:search)),query:(match_all:()),timeRestore:!f,title:dash-all,uiState:(),viewMode:view)";
  zeppelinUrl = "http://tcl2:8089/#/notebook/2CZ99W966";
  
  ngOnInit() {
    this.scrollToBottom1();
    this.scrollToBottom2();
    this.scrollToBottom3();
    this.finished1 = false;
    this.finished2 = false;
    this.finished3 = false;

    this.socket.on('ds', function (data) {
      this.message1 = data;
      if(data.indexOf("RECAP") >= 0)
      this.finished1 = true;
    }.bind(this));

    this.socket.on('elk', function (data) {
      this.message2 = data;
      if(data.indexOf("RECAP") >= 0)
      this.finished2 = true;
    }.bind(this));

    this.socket.on('bda', function (data) {
      this.message3 = data;
      if(data.indexOf("RECAP") >= 0)
      this.finished3 = true;
    }.bind(this));
  }
  
  ngAfterViewChecked() {        
    this.scrollToBottom1();
    this.scrollToBottom2();
    this.scrollToBottom3();
  } 
  
  scrollToBottom1(): void {
    try {
      this.myScrollContainer1.nativeElement.scrollTop = this.myScrollContainer1.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
  
  scrollToBottom2(): void {
    try {
      this.myScrollContainer2.nativeElement.scrollTop = this.myScrollContainer2.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
  scrollToBottom3(): void {
    try {
      this.myScrollContainer3.nativeElement.scrollTop = this.myScrollContainer3.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
  
  runDS() {
    this.http.get(this.apiUrl + "ds")
    .map(res => res.json())
    .subscribe(d => console.log(d));
  }
  
  runELK() {
    this.http.get(this.apiUrl + "elk")
    .map(res => res.json())
    .subscribe(d => console.log(d));
  }
  
  runBDA() {
    this.http.get(this.apiUrl + "bda")
    .map(res => res.json())
    .subscribe(d => console.log(d));
  }
}
