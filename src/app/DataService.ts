import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

access_token = '';
UserId = '';
jobid='';
candidateid= '';

loggedIN = false;
    constructor(private http: Http) {

        
    }
}