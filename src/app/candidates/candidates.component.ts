import { Component, OnInit } from '@angular/core';
import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { URLSearchParams} from '@angular/http';
import { DataService} from '../DataService';
import {Observable} from 'rxjs/Observable';
import { Experience} from '../profile/Experience';
import { Education} from '../profile/Education';
import { Profile} from '../profile/Profile';
import { Photo} from '../profile/Photo';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit {

  role = false;
  path = '';
  profile1 ={ Name: 'Shahnawaz', Address: 'Mountjoy', PhoneNumber:'08723533',Role:''};
  experience1 =[{ title: '', company: '', location:'',description:'', currentjob: false}];
  education1 =[{ name: '', degree: '', field:'',description:'', grade: ''}];
  photo1 = { studentid : '', image_name:'' };
  experience = new Experience('','','','',false);
  education = new Education('','','','','');

  profile = new Profile('','','');

  constructor(private DataService:DataService, private http:Http) {

    this.get_profile(this.DataService.jobid);
    console.log(this.DataService.jobid);

   }

  ngOnInit() {
  }
  get_profile(id)
  {
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.get('http://localhost:55899/api/AppliedJobsAPI/GetApplied_StudId/'+ id, options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
          this.DataService.candidateid = Serverdata.studentid;
                              

    this.http.get('http://localhost:55899/api/Account/GetUserProfile/'+ this.DataService.candidateid, options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Profile Data is ' + Serverdata , Serverdata.Id);
                                this.profile1 = Serverdata;
                                this.get_education( this.DataService.candidateid );
                                this.get_experience(this.DataService.candidateid);
                                this.getphoto(this.DataService.candidateid);
                                
   });
  });
  }

  get_experience(stud_id)
  {
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.get('http://localhost:55899/api/ExperiencesAPI/GetExperience_By_Id/' + stud_id, options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                            //    console.log('Experience Data is ' + Serverdata , Serverdata.Id);
                                this.experience1= Serverdata;
                                console.log('Experience data is'+ this.experience1[0] + this.experience1[0].company + Serverdata[0].company);
                                
   });
  }
  get_education(stud_id)
  {
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.get('http://localhost:55899/api/EducationsAPI/GetEducation_By_Id/'+ stud_id, options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Education Data is ' + Serverdata);
                                this.education1 = Serverdata;
                               
                                
   });
  }
  getphoto(id)
  {
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.get('http://localhost:55899/api/PhotosAPI/GetPhoto_By_Id/'+ id, options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Photo Data is ' + Serverdata );
                                this.photo1 = Serverdata;
                                this.photo1.image_name = "Scripts/dist/assets/Images/"+ this.photo1.image_name;              
   });
  }
  

}
