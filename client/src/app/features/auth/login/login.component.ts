import { Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);

  login() {
    const tst = {
      email: 'lucaslomeugomes@gmail.com',
      password: '123456',
    };

    console.log('tst', tst);

    this.authService.login(tst).subscribe({
      next: (response) => {
        console.log('response', response);
        this.authService.setToken('tokenValue');
        return response;
      },
    });
  }
}
