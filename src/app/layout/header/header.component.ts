import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/core/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/User';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  // use "!" as Definite Assignment Assertion
  currentUser$!: Observable<User | null>;
  private sub?: Subscription
  constructor(private authService: AuthService, private router: Router) { }
  isOpen: boolean = false;
  ngOnInit(): void {
    this.currentUser$ = this.authService.currentUser$;
  }

  isSticky = false;
  // Listen to the window scroll event to change header's sticky behavior
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isSticky = window.scrollY > 30;
  }

  logout() {
    this.authService.logout();
    alert('token cleared');
    this.isOpen = false;
    // this.router.navigate(['/sign-in']);
  }
  goToProfile() { this.router.navigate(['/profile']); }

  goToCart() { this.router.navigate(['/cart']); }

  toggleMenu() {
    this.isOpen = !this.isOpen
  }

}
