import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  data;

  constructor(private http:Http ) {

    this.http.get('https://student.almanac-learning.com/onenote/aboutme')
              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                console.log('Data is ' + Serverdata );
                this.data = Serverdata;
              });

   }

  ngOnInit() {
  }

}
