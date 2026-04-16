import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Layout} from './shared/components/layout';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Layout],
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class App {}
