// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

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
    FootercontentComponent
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [FootercontentService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
