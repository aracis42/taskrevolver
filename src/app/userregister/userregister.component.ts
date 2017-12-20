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
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css']
})

export class UserregisterComponent implements OnInit {
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(fb: FormBuilder, public dialog: MatDialog, public af: AngularFireAuth, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.registerForm = fb.group({
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

  onRegisterSubmit() {
    this.data.registerpending = true;
    if (this.registerForm.value.email != null && this.registerForm.value.password != null) {
      this.af.auth.createUserWithEmailAndPassword(this.registerForm.value.email, this.registerForm.value.password)
      .then((value) => {
        this.data.registerpending = false;
        this.dialog.closeAll();
      })
      .catch((error) => {
        if (error.code != null) {
          this.data.errormessage = error.message; // inject errormessage to the open register dialog
          this.data.errorcode = error.code;
        }
        if (error.code === 'auth/invalid-email' || error.code === 'auth/email-already-in-use') {
          this.data.invalidemail = true;
          this.data.invalidpassword = false;
          this.registerForm.controls.email.setErrors( {invalidValue: true} );
        }
        if (error.code === 'auth/weak-password') {
          this.data.invalidpassword = true;
          this.data.invalidemail = false;
          this.registerForm.controls.password.setErrors({ invalidValue: true });
          this.registerForm.controls.email.clearValidators();
        }
        this.data.registerpending = false;
      });
    }
  }

  onRegisterCancel() {
    this.dialog.closeAll();
  }

}
