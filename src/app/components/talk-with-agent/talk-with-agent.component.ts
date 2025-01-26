import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-talk-with-agent',
  imports: [RouterLink, AngularSvgIconModule],
  templateUrl: './talk-with-agent.component.html',
  styleUrl: './talk-with-agent.component.css'
})
export class TalkWithAgentComponent {

  @Input() mainTitle!: string;
  @Input() subTitle!: string;
  @Input() agent!:  any;
}
