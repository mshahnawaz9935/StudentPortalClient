import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {User} from './User';
import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new User('', '');
  show= true;
  constructor(private http:Http) { }

  ngOnInit() {
  }
  body;
  post_data(username,password)
  {
    console.log('name is', username,password);
    this.body = {  Email: username , Password: password ,ConfirmPassword : password};
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
  get_data(username,password){

  //  username = encodeURIComponent(username);
    const body = new URLSearchParams();
    body.set('userName', username);
    body.set('password', password);
    body.set('grant_type', 'password');
   // let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(body);
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:55899/Token', body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                   //  .catch((error) => Observable.throw(error.json().error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Data is ' + Serverdata.access_token );
                    })
  }
}
