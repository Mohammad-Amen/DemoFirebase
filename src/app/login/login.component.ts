import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading = false;
  error: string | null = null;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  async login(form: NgForm) {
    if (!form.valid) {
      this.error = "Please fill in all required fields correctly.";
      return;
    }
    this.isLoading = true;
    this.error = null;
    try {
      const result = await this.auth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/home']); // Navigate to the home page upon successful login
      console.log(result);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  clearError() {
    this.error = null;
  }
}
