import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css']
})
export class AppliedjobsComponent implements OnInit {
data=[];
applied;
companies;
jobs;
    constructor(private http:Http ) {

    this.http.get('http://localhost:55899/api/AppliedJobsAPI')
              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                this.applied = Serverdata;

                     this.http.get('http://localhost:55899/api/JobsAPI')
                              .map((response : Response) => response.json()).subscribe((Serverdata) => {
    
                                this.jobs = Serverdata;

                  this.http.get('http://localhost:55899/api/CompaniesAPI')
                              .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                this.companies = Serverdata;
                                 this.getdetails(this.applied , this.jobs, this.companies);
                               
                              });
                               });
   
             

              });

   }
   list;
   getdetails(applied, jobs , companies)
   {
     this.list = [];
     console.log(applied, jobs, companies);
     for(let apply of applied)
     {
        let title, desc ,companyname;
        for(let job of jobs)
        {
          if(apply.jobid == job.id)
          {
            title = job.title;
            desc = job.description;
          }
        }
        for(let company of companies)
        {
          if(company.id == apply.companyid)
          {
              companyname = company.name;
          }
        }
         this.list.push({"title" : title , "desc" :desc , "companyname" : companyname});
     }
     console.log(this.list);

   }

  ngOnInit() {
  }

}
