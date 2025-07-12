import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
@Component({
    selector: 'app-slider',
    imports: [],
    templateUrl: './slider.component.html',
    styleUrl: './slider.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SliderComponent implements AfterViewInit {
  constructor() { 
    register();

  }
  private swiperEl?: any;
  autoplayConfig = {
    delay: 3000, 
    disableOnInteraction: false
  };
  ngAfterViewInit(): void {
    this.swiperEl = document.querySelector('swiper-container');
    if(this.swiperEl) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            this.swiperEl.swiper.autoplay.start();
          }
        })
      })
      observer.observe(this.swiperEl)
    }
  }
}
