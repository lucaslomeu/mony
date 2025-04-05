import { Component, inject } from '@angular/core';
import { RegisterService } from '../../../shared/register.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  protected registerService = inject(RegisterService);

  register() {
    const userData = {
      name: 'Lucas Lomeu Gomes',
      email: 'lucaslomeugomes@gmail.com',
      password: '123456',
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
}
