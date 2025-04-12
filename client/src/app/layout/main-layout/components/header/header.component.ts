import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  authService = inject(AuthService);
  user = this.authService.getCurrentUser();

  logout() {
    this.authService.logout();
  }
}
