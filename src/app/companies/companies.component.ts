import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {URLSearchParams} from '@angular/http';
import { DataService} from '../DataService';
import { Router } from '@angular/router';
import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Company } from './Company';
declare var jQuery:any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})


export class CompaniesComponent implements OnInit {
  education1 =[{ name: '', degree: '', field:'',description:'', grade: ''}];
  post_or_update;
  company1 = { comp_id : 0 ,name : '', email :'', about:''};
  jobsdata=[];
  company_id;
  show = true;
  constructor(private http:Http , private DataService:DataService, private router:Router) {
    this.DataService.candidateid = '';
    this.getcompany(this.DataService.UserId);
   }

  ngOnInit() {
  }
  Company = new Company(0,'','','');
  body;
  post_data( name, email, about)
  {
    this.body = {  name: name , email: email ,
      about : about , Emp_Id: this.DataService.UserId
    
    };
       
    let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(bodyString);
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    if(this.company1.name == '')
    {
    console.log('name is', name, email, about, 'Posting');

    this.http.post('http://localhost:55899/api/CompaniesAPI', this.body, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error) => Observable.throw(error.json().error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Data is ' + Serverdata );
                          this.getcompany(this.DataService.UserId);
                    })
    }
    else {
      console.log('name is', name, email, about, 'updating');
      this.body = {  name: name , email: email ,
        about : about , Emp_Id: this.DataService.UserId , id: this.company_id
      
      };
      this.http.put('http://localhost:55899/api/CompaniesAPI/'+this.company_id, this.body, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
                         .subscribe((Serverdata) => {
                          console.log('Updated data is ' + Serverdata );
                          this.getcompany(this.DataService.UserId);
                          jQuery("#CompanyEditModal").modal("hide");
                    })

    }
}

getcompany(Emp_Id)
{
  let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
  , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
  let options       = new RequestOptions({ headers: headers }); // Create a request option

  this.http.get('http://localhost:55899/api/CompaniesAPI/GetCompany_ByEmp_Id/'+ Emp_Id, options)
      .map((response : Response) => response.json()).subscribe((Serverdata) => {
                              console.log('Profile Data is ' + Serverdata , Serverdata.Id);
                              this.company1 = Serverdata;
                              this.company_id = Serverdata.id;
                              console.log('Company id', this.company_id);                          
 });
}
showjobs()
{
  this.show = false;
  let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
  , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
  let options       = new RequestOptions({ headers: headers }); // Create a request option

  this.http.get('http://localhost:55899/api/JobsAPI/GetJobByCompany/'+ this.company_id, options)
      .map((response : Response) => response.json()).subscribe((Serverdata) => {
                              console.log('Jobs Data is ' + Serverdata);
                              this.jobsdata = Serverdata;                         
 });
}

togglejobs = false;

status = '';
deletejobs(id)
{

  this.http.delete('http://localhost:55899/api/JobsAPI/' + id).map((response : Response) => response.json()).subscribe((data) => {
    console.log('Jobs Deleted status is ' + data);   
    this.status = data;

  });
}
view_candidates(id)
{
  this.DataService.jobid  = id;
  this.router.navigate(['/candidates']);

}
back()
{
  this.show = true;
}

}