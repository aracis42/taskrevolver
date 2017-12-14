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
  user: Observable<firebase.User>;
  authenticated = false;
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
          this.authenticated = true;
          this.loginmodal = false;
          this.invalidemail = false;
          this.invalidpassword = false;
          this.errormessage = null;
          this.userDisplayName = firebase.auth().currentUser.displayName;
          this.userEmail = firebase.auth().currentUser.email;
          this.userUid = firebase.auth().currentUser.uid;
          console.log ( 'Email: ', firebase.auth().currentUser.email, 'Name: ', firebase.auth().currentUser.displayName );
          console.log ( 'UID: ', firebase.auth().currentUser.uid , 'Metadata: ', firebase.auth().currentUser.metadata );
        }
      }
    );

    this.loginForm = fb.group({
      'email': [''],
      'password': ['']
    });
  }

  ngOnInit() {
  }

  login() {
    this.loginmodal = true;
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
    this.loginmodal = false;
  }

  loginwithgoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.loginmodal = false;
  }

  register() {
  }

  logout() {
    this.af.auth.signOut();
    this.authenticated = false;
    this.loginForm.controls.password.reset();
  }
}
