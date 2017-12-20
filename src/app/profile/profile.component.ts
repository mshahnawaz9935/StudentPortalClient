import { Component, OnInit } from '@angular/core';
import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {};
  constructor(private http:Http) {
    this.http.get('http://localhost:50406/api/StudentsAPI/3000')
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Profile Data is ' + Serverdata );
                                this.profile = Serverdata;
                               
   });
  }

  ngOnInit() {
  }

}
