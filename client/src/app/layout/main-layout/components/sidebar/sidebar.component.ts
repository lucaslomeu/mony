import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isMenuOpen = false; // Controla o estado do menu hambúrguer

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alterna o estado do menu
  }
}
