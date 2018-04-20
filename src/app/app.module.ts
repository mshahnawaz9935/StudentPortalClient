import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { JobsComponent } from './jobs/jobs.component';
import { CompaniesComponent } from './companies/companies.component';
import { AppliedjobsComponent } from './appliedjobs/appliedjobs.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService} from './DataService';
import { AuthGuard } from './AuthGuard';
import { CandidatesComponent } from './candidates/candidates.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'home', component: HomeComponent },
    { path: 'jobs', component: JobsComponent },
       { path: 'companies', component: CompaniesComponent },
          { path: 'login', component: LoginComponent },
             { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
                { path: 'appliedjobs', component: AppliedjobsComponent },
                { path: 'candidates', component: CandidatesComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    JobsComponent,
    CompaniesComponent,
    AppliedjobsComponent,
    LoginComponent,
    ProfileComponent,
    CandidatesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
