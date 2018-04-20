import { Component, OnInit } from '@angular/core';
import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { URLSearchParams} from '@angular/http';
import { DataService} from '../DataService';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {
  profile1 ={ Name: '', Address: '', PhoneNumber:'',Role:''};

  constructor(private DataService:DataService, private http:Http) {

    this.get_profile();

   }

  ngOnInit() {
  }
  get_profile()
  {
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.get('http://localhost:55899/api/Account/UserInfo', options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Profile Data is ' + Serverdata , Serverdata.Id);
                                this.profile1 = Serverdata;
                                
   });
  }

}
