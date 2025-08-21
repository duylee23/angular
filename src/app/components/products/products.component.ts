import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products',
  imports: [MatIcon, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  isOpenFilter: boolean = true;

  allCategories: {name: string}[] = [
    {
      "name" : "Training Gym"
    },
    {
      "name" : " Gender"  
    },
    {
      "name" : "Size"
    },
    {
      "name" : "Colour"
    },
    {
      "name" : "Brand"
    },
    {
      "name" : "Shoe Height"
    },
    {
      "name" : "Width"
    } 
  ]
  toggleFilter() {
    this.isOpenFilter = !this.isOpenFilter
  }


}
