// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MaterialModule } from './material.module';

// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { TacComponent } from './tac/tac.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { FooterComponent } from './footer/footer.component';
import { Footergroup1Component } from './footer/footergroup1/footergroup1.component';
import { Footergroup2Component } from './footer/footergroup2/footergroup2.component';
import { Footergroup3Component } from './footer/footergroup3/footergroup3.component';
import { FootercontentComponent } from './footer/footercontent/footercontent.component';

// Services
import { FootercontentService } from './footer/footercontent/footercontent.service';
import { TeamsComponent } from './teams/teams.component';
import { TeamlistComponent } from './teams/teamlist/teamlist.component';
import { TeamComponent } from './teams/team/team.component';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserloginComponent } from './userlogin/userlogin.component';

// import { AUTH_PROVIDERS } from './auth.service';
// import { LoggedInGuard } from './logged-in.guard';

export const firebaseConfig = {
  apiKey: 'AIzaSyBTKLdH1cGYtg1aMY4S_ZeDT_TFJvaoGbM',
  authDomain: 'taskrevolver.firebaseapp.com',
  databaseURL: 'https://taskrevolver.firebaseio.com',
  storageBucket: 'taskrevolver.appspot.com',
  messagingSenderId: '1003943567678'
};

const routes: Routes = [
// basic routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'tac', component: TacComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'admin/teams', component: TeamsComponent },
//  { path: 'contactus', redirectTo: 'contact' },

  // authentication demo
//  { path: 'login', component: LoginComponent },
//  {
//    path: 'protected',
//    component: ProtectedComponent,
//    canActivate: [ LoggedInGuard ]
//  }

// nested
// {
//    path: 'products',
//    component: ProductsComponent,
//    children: childRoutes
//  }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    TacComponent,
    PrivacyComponent,
    FooterComponent,
    Footergroup1Component,
    Footergroup2Component,
    Footergroup3Component,
    FootercontentComponent,
    TeamsComponent,
    TeamlistComponent,
    TeamComponent,
    UserregisterComponent,
    UserloginComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    MaterialModule
  ],
  providers: [FootercontentService, AngularFireAuth],
  bootstrap: [AppComponent],
  entryComponents: [UserloginComponent, UserregisterComponent]
})
export class AppModule { }
