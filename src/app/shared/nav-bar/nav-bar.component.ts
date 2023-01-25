import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(private router: Router) {}

  isMobileMenuOpen: boolean = false;

  toggleMenu(event: Event) {
    event.preventDefault();
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  get isHome() {
    return this.router.url === '/';
  }

  get isHistory() {
    return this.router.url === '/history';
  }
}
