import { Component, OnInit } from '@angular/core';
import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Profile } from './Profile';
import { URLSearchParams} from '@angular/http';
import { DataService} from '../DataService';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  role = false;
  profile1 ={ Name: '', Address: '', PhoneNumber:'',Role:''};
  profile = new Profile('','','');
  constructor(private http:Http , private DataService:DataService) {

    this.get_profile();
    
    setTimeout(()=>
  {
    console.log(this.DataService.access_token,' ID ',this.DataService.UserId);
  },2000);
   
  }

  ngOnInit() {
  }

  profile_data(name, PhoneNumber,Address)
  {
    console.log('name is', name,Address, PhoneNumber);
    const body = new URLSearchParams();
    body.set('Name', name);
    body.set('PhoneNumber', PhoneNumber);
    body.set('Address', Address);
   // let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(body);
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:55899/api/Account/EditProfile', body, options) // ...using post request
                     .map((res:Response) => res) // ...and calling .json() on the response to return data
                     .catch((error) => Observable.throw(error.error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Data is ' + Serverdata );
                          this.get_profile();
                    })
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
                                this.DataService.UserId = Serverdata.Id;

                                if(this.profile1.Role == 'Employer')
                                  this.role = true;
                                
   });
  }

}
