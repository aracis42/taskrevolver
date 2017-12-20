import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { auth } from 'firebase/app';
import { MaterialModule } from '../material.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})

export class UserloginComponent implements OnInit {
  loginForm: FormGroup;
  loginpending = false;
  invalidemail = false;
  invalidpassword = false;
  errorcode = null;
  errormessage = null;
  pendingspinnercolor = 'primary';
  pendingspinnermode = 'indeterminate';
  pendingspinnervalue = 50;

  matcher = new MyErrorStateMatcher();

  constructor(fb: FormBuilder, public dialog: MatDialog, public af: AngularFireAuth, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.loginForm = fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }

  ngOnInit() {

  }

  onLoginSubmit(loginpending) {
    this.data.loginpending = true;
    if (this.loginForm.value.email != null && this.loginForm.value.password != null) {
      this.af.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((value) => {
        this.data.loginpending = false;
        this.dialog.closeAll();
      })
      .catch((error) => {
        if (error.code != null) {
          this.data.errormessage = error.message; // inject errormessage to the open login dialog
          this.data.errorcode = error.code;
        }
        if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
          this.data.invalidemail = true;
          this.data.invalidpassword = false;
          this.loginForm.controls.email.setErrors( {invalidValue: true} );
        }
        if (error.code === 'auth/wrong-password') {
          this.data.invalidpassword = true;
          this.data.invalidemail = false;
          this.loginForm.controls.password.setErrors({ invalidValue: true });
          this.loginForm.controls.email.clearValidators();
        }
        this.data.loginpending = false;
      });
    }

  }

  onLoginCancel() {
    this.errorcode = null;
    this.dialog.closeAll();
  }

  onGoogleLogin() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.dialog.closeAll();
  }
}
