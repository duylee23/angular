import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SliderComponent } from '../../shared/slider/slider.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [SliderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeComponent   {

  constructor() { }
 

}
