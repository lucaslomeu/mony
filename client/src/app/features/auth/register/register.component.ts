import { Router, RouterLink } from '@angular/router';
import { Component, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RegisterService } from '../../../shared/services/register.service';
import { CepService } from '../../../shared/services/cep.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private registerService = inject(RegisterService);
  private cepService = inject(CepService);
  private router = inject(Router);

  states = this.cepService.loadedStates;
  cities = this.cepService.loadedCities;

  stateSelected = input<string>('');
  citySelected = input<string>('');

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      confirmEmail: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      address: new FormGroup({
        state: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        cep: new FormControl('', [Validators.required, this.cepValidator]),
        street: new FormControl('', [Validators.required]),
        number: new FormControl('', [Validators.required]),
        complement: new FormControl(''),
        neighborhood: new FormControl('', [Validators.required]),
      }),
    },
    {
      validators: [
        RegisterComponent.matchEmails,
        RegisterComponent.matchPasswords,
      ],
    }
  );

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

    const selectedStateValue = this.states().find(
      (state) => state.id === this.cepService.stateSelected()
    );

    const userData = {
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      address: {
        ...this.registerForm.get('address')?.value,
        state: selectedStateValue?.id,
        cep: this.registerForm.get('address.cep')?.value.replace('-', ''),
        city: this.registerForm.get('address')?.value.city,
      },
    };

    this.registerService.register(userData).subscribe({
      next: () => {
        this.registerForm.reset();
        this.router.navigate(['/auth/login']);
        console.log('User registered successfully!');
      },
      error: (err) => {
        console.error('Registration failed', err);
      },
    });
  }

  onStateChange() {
    const selectedState = this.registerForm.get('address')?.value.state;
    this.cepService.setState(Number(selectedState));
  }

  formatCep(ev: any): string {
    const value = ev.target.value.replace(/\D/g, '');
    return value.length > 5
      ? value.substring(0, 5) + '-' + value.substring(5, 8)
      : value;
  }

  private cepValidator(control: AbstractControl) {
    const cepPattern = /^\d{5}-\d{3}$/;
    return cepPattern.test(control.value) ? null : { invalidCep: true };
  }

  static matchEmails(group: AbstractControl) {
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;
    if (email && confirmEmail && email !== confirmEmail) {
      return { emailMismatch: true };
    }
    return null;
  }

  static matchPasswords(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
