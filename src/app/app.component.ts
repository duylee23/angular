import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from "./layout/main-layout/main-layout.component";

@Component({
    selector: 'app-root',
    imports: [RouterModule, MainLayoutComponent],
    template: `<app-main-layout></app-main-layout>`
})
export class AppComponent {
}
