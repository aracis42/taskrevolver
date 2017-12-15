import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loginForm: FormGroup;
  loginmodal: boolean;
  registerForm: FormGroup;
  registermodal: boolean;
  user: Observable<firebase.User>;
  authenticated = false;
  emailnotverified = false;
  errorcode: string;
  errormessage: string;
  invalidemail = false;
  invalidpassword = false;
  email: string;
  password: string;
  userDisplayName: string;
  userEmail: string;
  userUid: string;

  constructor( fb: FormBuilder, public af: AngularFireAuth) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          if (auth.emailVerified === true) {
            this.emailnotverified = false;
            this.authenticated = true;
            this.loginmodal = false;
            this.errormessage = null;
            this.invalidemail = false;
          } else {
            this.emailnotverified = true;
            this.authenticated = false;
            this.loginmodal = true;
            this.invalidemail = true;
            this.errormessage = 'The email address is not verified yet';
          }
          this.registermodal = false;
          this.invalidpassword = false;
          this.userDisplayName = firebase.auth().currentUser.displayName;
          this.userEmail = firebase.auth().currentUser.email;
          this.userUid = firebase.auth().currentUser.uid;
          console.log ( 'User logged in: ', firebase.auth().currentUser.displayName );
        }

      }
    );

    this.loginForm = fb.group({
      'email': [''],
      'password': ['']
    });

    this.registerForm = fb.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
  }

  login() {
    this.loginmodal = true;
    this.errormessage = null;
  }

  loginwithemail() {
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.invalidemail = false;
    this.invalidpassword = false;
    this.af.auth.signInWithEmailAndPassword(this.email, this.password).catch((error) => {
      this.errorcode = error.code;
      this.errormessage = error.message;
      if (this.errorcode === 'auth/invalid-email' || 'auth/user-not-found') {
        this.invalidemail = true;
        this.invalidpassword = false;
      }
      if (this.errorcode === 'auth/wrong-password') {
        this.invalidpassword = true;
        this.invalidemail = false;
      }
    });
  }

  logincancel() {
    if (this.af.auth.currentUser.uid != null) {
      this.af.auth.signOut().catch((error) => {
      });
    }
    this.invalidemail = false;
    this.invalidpassword = false;
    this.loginmodal = false;
  }

  loginwithgoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.loginmodal = false;
  }

  register() {
    this.registermodal = true;
  }

  registersubmit() {
    this.email = this.registerForm.value.email;
    this.password = this.registerForm.value.password;
    this.invalidemail = false;
    this.invalidpassword = false;
    this.af.auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
      this.errorcode = error.code;
      this.errormessage = error.message;
      if (this.errorcode === 'auth/invalid-email' || 'auth/email-already-in-use') {
        this.invalidemail = true;
        this.invalidpassword = false;
        this.registermodal = true;
      }
      if (this.errorcode === 'auth/weak-password') {
        this.invalidemail = false;
        this.invalidpassword = true;
        this.registermodal = true;
      }
    });
    if (this.errorcode != null) {
      this.registermodal = false;
    }
  }

  registercancel() {
    this.invalidemail = false;
    this.invalidpassword = false;
    this.registermodal = false;
  }

  logout() {
    this.af.auth.signOut();
    this.authenticated = false;
    this.loginForm.controls.password.reset();
  }

  sendVerfificationEmail() {
    this.af.auth.currentUser.sendEmailVerification();
  }

}
