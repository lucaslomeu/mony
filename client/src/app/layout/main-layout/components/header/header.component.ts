import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { AuthService } from '../../../../shared/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserService } from '../../../../shared/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() toggleMenu = new EventEmitter<void>();

  private userService = inject(UserService);
  private authService = inject(AuthService);
  user = toSignal(this.userService.currentUser$, { initialValue: null });

  logout() {
    this.authService.logout();
  }
}
