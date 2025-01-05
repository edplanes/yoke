import { app } from 'electron';
import { afterNextRender, afterRender, Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { ElectronService } from 'ngx-electronyzer';
import { version } from '../../../../../../package.json';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ]
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private electronService: ElectronService | undefined;

  routes = [
    { link: 'about', title: 'About' },
    { link: 'contact', title: 'Contact' },
  ]

  isTablet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isElectron = false;

  appVersion = version;

  minimize() {
    this.electronService?.ipcRenderer.send('minimize');
  }

  maximize() {
    this.electronService?.ipcRenderer.send('maximize');
  }

  close() {
    this.electronService?.ipcRenderer.send('close');
  }

  constructor() {
    if (typeof window !== 'undefined') {
      this.electronService = new ElectronService();
      this.isElectron = this.electronService.isElectronApp;
    }
  }
}
