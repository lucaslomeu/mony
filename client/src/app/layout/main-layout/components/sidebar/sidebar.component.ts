import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isMenuOpen = false;
  mobileOpen = input<boolean>(false);

  @Output() close = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  private userService = inject(UserService);
  user = toSignal(this.userService.currentUser$, { initialValue: null });

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.close.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }
}
