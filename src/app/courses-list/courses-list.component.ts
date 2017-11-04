import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  coursesObservable: Observable<any[]>;

  constructor(private db: AngularFireDatabase) { }
  constructor() { }

  ngOnInit() {
    this.coursesObservable = this.getCourses('/courses');
  }
  
  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
}
