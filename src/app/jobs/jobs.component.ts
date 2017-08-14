import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  data;
  companies;
  constructor(private http:Http ) {

    this.http.get('http://localhost:50406/api/CompaniesAPI')
              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                console.log('Data is ' + Serverdata );
                this.companies = Serverdata;

                                this.http.get('http://localhost:50406/api/JobsAPI')
                              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Data is ' + Serverdata );
                                this.data = Serverdata;
                                this.getcompany(this.data);
                              });


              });

   }

   getcompany(data)
   {
     data.forEach(job => {

       for(let company of this.companies)
       {
         if(job.companyid == company.id)
         job.name = company.name;
       }
       
     });

   }


  ngOnInit() {
  }
      
  body;
  apply(companyid, jobid)
  { 
        console.log('here');
        this.body = {  studentid: '3000' , companyid: companyid , jobid : jobid, applydate : '13/8/2017' };
        let bodyString = JSON.stringify(this.body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        this.http.post('http://localhost:50406/api/AppliedJobsAPI', this.body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error) => Observable.throw(error.json().error || 'Server error'))
                         .subscribe((Serverdata) => {
                              console.log('Data is ' + Serverdata );
                              this.data = Serverdata;
                        })
                          //...errors if any
   

  }

}
