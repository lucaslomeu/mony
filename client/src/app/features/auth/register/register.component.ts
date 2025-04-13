import { RouterLink } from '@angular/router';
import { Component, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterService } from '../../../shared/register.service';
import { CepService } from '../../../shared/cep.service';
import { State } from '../../../shared/enums/state';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private registerService = inject(RegisterService);
  private cepService = inject(CepService);

  states = this.cepService.loadedStates;
  cities = this.cepService.loadedCities;

  stateSelected = input<string>('');
  citySelected = input<string>('');

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmEmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    address: new FormGroup({
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      cep: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      complement: new FormControl(''),
      neighborhood: new FormControl('', [Validators.required]),
    }),
  });

  register() {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach((key) => {
        const controlErrors = this.registerForm.get(key)?.errors;
        if (controlErrors) {
          console.error(`Error in ${key}:`, controlErrors);
        }
      });
      this.registerForm.markAllAsTouched();
      console.error('Form is invalid');
      return;
    }

    const selectedStateValue = this.registerForm.get('address.state')?.value;
    const stateKey = Object.keys(State).find(
      (key) => State[key as keyof typeof State] === selectedStateValue
    );

    const userData = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      address: {
        ...this.registerForm.get('address')?.value,
        state: stateKey,
        cep: this.registerForm.get('address.cep')?.value.replace('-', ''),
      },
    };

    this.registerService.register(userData).subscribe({
      next: () => {
        console.log('User registered successfully!');
      },
      error: (err) => {
        console.error('Registration failed', err);
      },
    });
  }

  onStateChange() {
    const selectedState = this.registerForm.get('address.state')?.value;
    this.cepService.setState(selectedState);
  }
}
