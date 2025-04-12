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
  isMenuOpen = false; // Controla o estado do menu hambúrguer
  mobileOpen = input<boolean>(false);

  @Output() close = new EventEmitter<void>();
  @Output() logoutEvent = new EventEmitter<void>();

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alterna o estado do menu
  }

  closeMenu() {
    console.warn('closeMenu() called'); // Log para depuração
    this.isMenuOpen = false; // Fecha o menu
    this.close.emit(); // Emite o evento de fechamento
  }

  logout() {
    this.logoutEvent.emit(); // Emite o evento de logout
  }
}
