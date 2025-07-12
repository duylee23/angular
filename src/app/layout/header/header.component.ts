import { Component, HostListener } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThreeSceneComponent } from '../../shared/three-scene/three-scene.component';
@Component({
    selector: 'app-header',
    imports: [MatSlideToggleModule, MatIconModule, RouterModule, CommonModule, ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router){}
    // Track whether header should be sticky
    isSticky = false;

    // Listen to the window scroll event to change header's sticky behavior
    @HostListener('window:scroll', [])
    onWindowScroll(): void {
      this.isSticky = window.scrollY > 30; 
    }
}
