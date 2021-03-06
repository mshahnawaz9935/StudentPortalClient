import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../DataService';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {

  data;
  searchdata;
  companies;
  constructor(private http:Http , private DataService : DataService  ) {

    this.http.get('http://localhost:55899/api/CompaniesAPI')
              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                console.log('Data is ' + Serverdata );
                this.companies = Serverdata;

                                this.http.get('http://localhost:55899/api/JobsAPI')
                              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Data is ' + Serverdata );
                                this.data = Serverdata;
                                this.getcompany(this.data);
                              });


              });

              // this.http.get('http://localhost:50406/Jobs/getdata')
              // .map((response : Response) => response.json()).subscribe((Serverdata) => {
              //   console.log('xml is ' + Serverdata["soap:Envelope"] );
              //   this.renderxml(Serverdata["soap:Envelope"]);
              // });

   }
   data1;
   renderxml(data)
   {
     this.data1 = data["soap:Body"].SearchJobsResponse.SearchJobsResult.JobListItem;
     for(let job of this.data1)
      {
        console.log(job);
      }

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
    this.searchdata=['Delhi','Kerala','Tamil Nadu','Banglore','Uttar Pradesh','Noida','Haryana','Thrissur'];
  }
      
  body;
  apply(companyid, jobid)
  { 
        if(this.DataService.loggedIN == true)
        {
        this.body = {  studentid: '3000' , companyid: companyid , jobid : jobid, applydate : '13/8/2017' };
        let bodyString = JSON.stringify(this.body); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option

        this.http.post('http://localhost:55899/api/AppliedJobsAPI', this.body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error) => Observable.throw(error.json().error || 'Server error'))
                         .subscribe((Serverdata) => {
                              console.log('Data is ' + Serverdata );
                        })
                          //...errors if any
                      }
                      else{
                        alert('Login or create an account to apply');
                      }
   

  }

}
