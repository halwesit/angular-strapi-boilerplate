import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFormSubmitted = false;
  userForm = new FormGroup({
    userName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  error: string = ''
  user: { identifier: string, password: string } = { identifier: '', password: '' };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.loggedinUser()) {
      this.router.navigate(['/home']);
    }

    // Patterns
    const PAT_NAME = "^[a-zA-Z0-9]{2,20}$";
    const PAT_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$";

    this.userForm = this.formBuilder.group({
      identifier: ['', [Validators.required, Validators.pattern(PAT_EMAIL)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.error = ''

    this.isFormSubmitted = true
    if (this.userForm.invalid) {
      return;
    }
    this.user =
      { identifier: this.userForm.controls['identifier'].value, password: this.userForm.controls['password'].value }

    this.authService.loginUser(this.user).subscribe((res: { jwt: string, user: User }) => {
      this.error = ''
      localStorage.removeItem('jwt')
      localStorage.setItem('jwt', res.jwt)
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigate(['/dashboard'])
    }, (err) => {
      this.error = err.error.message[0].messages[0].id
    })
    this.user = {
      identifier: '',
      password: '',
    }
  }

}
