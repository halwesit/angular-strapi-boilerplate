import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/interfaces/new-user';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  isFormSubmitted = false;
  userForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  error: string = ''
  user: NewUser = {
    username: '',
    email: '',
    password: '',
  };
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if (this.authService.loggedinUser()) {
      this.router.navigate(['/home']);
    }
    // Patterns
    const PAT_NAME = "^[a-zA-Z0-9]{2,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(PAT_NAME)]],
      email: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.error = ''

    this.isFormSubmitted = true
    if (this.userForm.invalid) {
      return;
    }
    this.user = {
      username: this.userForm.controls['username'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
    }

    this.authService.signupUser(this.user).subscribe((res) => {
      this.error = ''
      localStorage.removeItem('jwt')
      localStorage.setItem('jwt', res.jwt)
      localStorage.setItem('user', JSON.stringify(res.user))

      this.router.navigate(['/dashboard'])
    }, (err) => {
      this.error = err.error.message[0].messages[0].id
    })
    this.user = {
      username: '',
      email: '',
      password: '',
    }
  }
}
