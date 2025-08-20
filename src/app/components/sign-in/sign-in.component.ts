import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/core/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
 loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLogin(event: Event): void {
        event.preventDefault();
        if(this.loginForm.valid) {
            const {username, password} = this.loginForm.value;
            this.authService.login({username, password}).subscribe({
                next: (user) => {
                    console.log('Login successfully')
                    alert('Login successfully')
                    this.router.navigate(['/'])
                },
                error: (err) => {
                    console.error('Login failed: ', err.message)
                    alert('Login failed! ' + err.message)
                },
            })
        } else {
            alert('Login form is not valid, please try again! ')
        }
    }  
}
