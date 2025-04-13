import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.close.emit();
  }

  logout() {
    this.logoutEvent.emit();
  }
}
