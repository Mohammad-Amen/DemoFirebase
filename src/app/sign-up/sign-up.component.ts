// src/app/sign-up/sign-up.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading = false;
  error: string | null = null;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) {}

  async signUp(form: NgForm) {
    if (!form.valid || this.password !== this.confirmPassword) {
      this.error = "Please fill in all required fields correctly and ensure passwords match.";
      return;
    }
    this.isLoading = true;
    this.error = null;
    try {
      const result = await this.auth.createUserWithEmailAndPassword(this.email, this.password);
      await this.firestore.collection('users').doc(result.user.uid).set({
        uid: result.user.uid,
        email: result.user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Sign-up error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  clearError() {
    this.error = null;
  }
}
