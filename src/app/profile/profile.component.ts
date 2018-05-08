import { Component, OnInit } from '@angular/core';
import {  Http , RequestOptions, Headers, Response } from '@angular/http'; 
import { Profile } from './Profile';
import {Photo} from './Photo';
import { Experience } from './Experience';
import { Education } from './Education';
import { URLSearchParams} from '@angular/http';
import { DataService} from '../DataService';
import { Observable} from 'rxjs/Observable';
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
  path = '';
  profile1 ={ Name: 'Shahnawaz', Address: 'Mountjoy', PhoneNumber:'08723533',Role:''};
  experience1 =[{ title: '', company: '', location:'',description:'', currentjob: false}];
  education1 =[{ name: '', degree: '', field:'',description:'', grade: ''}];
  photo1 = { studentid : '', image_name:'' };
  experience = new Experience('','','','',false);
  education = new Education('','','','','');

  profile = new Profile('','','');
  constructor(private http:Http , private DataService:DataService) {
    console.log(this.photo1.image_name.length);

    this.get_profile();
    
    setTimeout(()=>
  {
    console.log(this.DataService.access_token,' ID ',this.DataService.UserId);
    this.get_experience(this.DataService.UserId);
    this.get_education(this.DataService.UserId);
    this.getphoto(this.DataService.UserId);
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
  post_experience(title, company,location,description)
  {
    console.log('name is', title, company,location,description);
    const body = new URLSearchParams();
    body.set('title', title);
    body.set('company', company);
    body.set('location', location);
    body.set('description', description);
    body.set('studentid' ,this.DataService.UserId);
    body.has('currentjob');
   // let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(body);
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:55899/api/ExperiencesAPI', body, options) // ...using post request
                     .map((res:Response) => res) // ...and calling .json() on the response to return data
                     .catch((error) => Observable.throw(error.error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Data is ' + Serverdata );
                    })
  }
  post_education(name, grade, degree, field, description)
  {
    console.log('name is', name, grade, field ,grade ,description);
    const body = new URLSearchParams();
    body.set('name', name);
    body.set('grade', grade);
    body.set('degree', degree);
    body.set('field', field);
    body.set('studentid' ,this.DataService.UserId);
    body.set('description', description);
   // let bodyString = JSON.stringify(this.body); // Stringify payload
    console.log(body);
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.post('http://localhost:55899/api/EducationsAPI', body, options) // ...using post request
    .map((res:Response) => res) // ...and calling .json() on the response to return data
    .catch((error) => Observable.throw(error.error || 'Server error'))
    .subscribe((Serverdata) => {
         console.log('Data is ' + Serverdata );
   })
  }
  fileUpload(event)
  {
    let headers      = new Headers({
     'Authorization':'Bearer '+ this.DataService.access_token+'' });

    let options= new RequestOptions({ headers: headers });

    let formData:FormData = new FormData();
 
   let fileList: FileList = event.target.files;  
   let file  = fileList[0];
   console.log(this.path , file, file.name);
   formData.append('name', file.name);
   formData.append('studentid', this.DataService.UserId );
   formData.append('file', file );
  
    this.http.post('http://localhost:55899/api/PhotosAPI', formData, options) // ...using post request
                     .map((res:Response) => res) // ...and calling .json() on the response to return data
                     .catch((error) => Observable.throw(error.error || 'Server error'))
                     .subscribe((Serverdata) => {
                          console.log('Photo Status is ' + Serverdata );  
                          this.getphoto(this.DataService.UserId);
                    })
  }
  getphoto(id)
  {
    let headers      = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' 
    , 'Authorization':'Bearer '+ this.DataService.access_token+'' }); 
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    this.http.get('http://localhost:55899/api/PhotosAPI/GetPhoto_By_Id/'+ this.DataService.UserId, options)
        .map((response : Response) => response.json()).subscribe((Serverdata) => {
                                console.log('Photo Data is ' + Serverdata );
                                this.photo1 = Serverdata;
                                this.photo1.image_name = "Scripts/dist/assets/Images/"+ this.photo1.image_name;              
   });
  }
}
