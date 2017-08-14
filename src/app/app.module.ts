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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
    { path: 'jobs', component: JobsComponent },
       { path: 'companies', component: CompaniesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    JobsComponent,
    CompaniesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
