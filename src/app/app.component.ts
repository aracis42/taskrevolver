import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { auth } from 'firebase/app';
import { MaterialModule } from './material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserregisterComponent } from './userregister/userregister.component';
import { UserloginComponent } from './userlogin/userlogin.component';

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

  verifyemailbutton = false;
  loginbutton = false;
  registerbutton = false;
  logoutbutton = false;

  errorcode: string;
  errormessage: string;
  invalidemail = false;
  invalidpassword = false;
  useremail: string;
  userpassword: string;
  userDisplayName: string;
  userEmail: string;
  userUid: string;
  registerdialog: MatDialog;
  logindialog: MatDialog;

  // registerEmailDialogRef: MatDialogRef<RegisterEmailDialogComponent>;

  // database = firebase.database();

  constructor( fb: FormBuilder, public dialog: MatDialog, public af: AngularFireAuth, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.af.authState.subscribe(
      (auth) => {
        if (auth != null) {
          this.user = af.authState;
          if (auth.emailVerified === true) {
            this.verifyemailbutton = false;
            this.loginbutton = false;
            this.registerbutton = false;
            this.logoutbutton = true;

            this.emailnotverified = false;
            this.authenticated = true;
            this.loginmodal = false;
            this.errormessage = null;
            this.invalidemail = false;
          } else {
            this.verifyemailbutton = true;
            this.loginbutton = false;
            this.registerbutton = false;
            this.logoutbutton = false;

            this.emailnotverified = true;
            this.authenticated = false;
            this.loginmodal = true;
            this.invalidemail = true;
            this.errormessage = 'The email address is not verified yet';
          }
          this.registerdialog = dialog;
          this.registermodal = false;
          this.invalidpassword = false;
          this.userDisplayName = firebase.auth().currentUser.displayName;
          this.userEmail = firebase.auth().currentUser.email;
          this.userUid = firebase.auth().currentUser.uid;
          // console.log ( 'User logged in: ', firebase.auth().currentUser.displayName );
        } else {
          this.verifyemailbutton = false;
          this.loginbutton = true;
          this.registerbutton = true;
          this.logoutbutton = false;
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
  register() {
    const dialogRef = this.dialog.open(UserregisterComponent, {
      width: '40em',
      data: {
        registerpending: null,
        validemail: null,
        validpassword: null,
        errorcode: null,
        errormessage: null
       },
    });
  }

  ngOnInit() {
  }

  login() {
    const dialogRef = this.dialog.open(UserloginComponent, {
      width: '40em',
      data: {
        loginpending: null,
        validemail: null,
        validpassword: null,
        errorcode: null,
        errormessage: null
       },
    });
    // console.log(dialogRef);
  }

  loginalt() {
    this.loginmodal = true;
    this.errormessage = null;
  }

  logincancel() {
    this.invalidemail = false;
    this.invalidpassword = false;
    this.loginmodal = false;
    // console.log ('Logincancel loginmodal:', this.loginmodal );
  }

  loginwithgoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.loginmodal = false;
  }

  registerold() {
    this.registermodal = true;
  }

/*
  registersubmit() {
    this.useremail = this.registerForm.value.email;
    this.userpassword = this.registerForm.value.password;
    this.invalidemail = false;
    this.invalidpassword = false;
    this.af.auth.createUserWithEmailAndPassword(this.useremail, this.userpassword).catch((error) => {
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
*/

  logout() {
    this.af.auth.signOut();
    this.authenticated = false;
    this.loginForm.controls.password.reset();
  }

  sendVerfificationEmail() {
    this.af.auth.currentUser.sendEmailVerification();
  }

}
