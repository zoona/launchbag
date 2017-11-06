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

  title = 'launchbag';
  message1: any;
  message2: any;
  socket = io('http://169.56.88.43:3000');
  finished1: boolean;
  finished2: boolean;
  constructor(private http: Http){}

  ngOnInit() {
    this.scrollToBottom1();
    this.scrollToBottom2();
    this.finished1 = false;
    this.finished2 = false;
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
  }

  ngAfterViewChecked() {        
    this.scrollToBottom1();       
    this.scrollToBottom2();    
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

  runDS() {
    this.http.get("http://169.56.88.43:3000/api/ds")
      .map(res => res.json())
      .subscribe(d => console.log(d));
  }

  runELK() {
    this.http.get("http://169.56.88.43:3000/api/elk")
      .map(res => res.json())
      .subscribe(d => console.log(d));
  }
}
