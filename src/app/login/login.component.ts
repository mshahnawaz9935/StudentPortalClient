import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {User} from './User';
import {URLSearchParams} from '@angular/http';
import { DataService} from '../DataService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new User('', '','','');
  show= true;
  constructor(private http:Http, private DataService:DataService,private router:Router) {
    if(this.DataService.loggedIN == true)
    {
      console.log('Login status is', this.DataService.loggedIN );
      this.router.navigate['/profile'];
    }
   }

  ngOnInit() {
  }
  body;
  post_data(username,password,confirm_password,role)
  {
    console.log('name is', username,password, role);
    if(password == confirm_password)
      {
    this.body = {  Email: username , Password: password ,
      ConfirmPassword : password,
      Role : role
    
  };
    let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(bodyString);
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:55899/api/Account/Register', this.body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error) => Observable.throw(error.json().error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Data is ' + Serverdata );
                    })
                  }
                  else alert('Password do not match');
  }
  get_data(username,password){

  //  username = encodeURIComponent(username);
    const body = new URLSearchParams();
    body.set('userName', username);
    body.set('password', password);
    body.set('grant_type', 'password');
   // let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(body );
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:55899/Token', body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                   //  .catch((error) => Observable.throw(error.json().error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Data is ' + Serverdata.access_token );
                          this.DataService.access_token =  Serverdata.access_token;
                          this.DataService.loggedIN = true;
                          this.router.navigate(['/profile']);
                    })
  }
}
