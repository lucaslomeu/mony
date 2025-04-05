import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../../shared/register.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected registerService = inject(RegisterService);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    address: new FormGroup({
      cep: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      neighborhood: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
    }),
  });

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.error('Form is invalid');
      return;
    }

    const userData = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      address: {
        cep: this.registerForm.get('address.cep')?.value,
        street: this.registerForm.get('address.street')?.value,
        number: this.registerForm.get('address.number')?.value,
        complement: this.registerForm.get('address.complement')?.value,
        neighborhood: this.registerForm.get('address.neighborhood')?.value,
        city: this.registerForm.get('address.city')?.value,
        state: this.registerForm.get('address.state')?.value,
      },
    };

    console.warn('User Data:', userData);

    this.registerService.register(userData).subscribe({
      next: () => {
        console.log('User registered successfully!');
      },
      error: (err) => {
        console.error('Registration failed', err);
      },
    });
  }
}
