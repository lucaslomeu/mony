import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  authService = inject(AuthService);
  toggleMenu() {
    console.warn('open');
  }

  logout() {
    this.authService.logout();
  }
}
