import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-layout',
  imports: [
    NavComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
