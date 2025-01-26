import { Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-client-card',
  imports: [AngularSvgIconModule],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css'
})
export class ClientCardComponent {

  @Input() client!: any;

  generateArray(length: number): number[]{
    return Array.from({length}, (_,i) => i)
  }
}
