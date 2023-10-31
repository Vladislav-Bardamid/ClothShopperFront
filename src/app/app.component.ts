import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  darkMode = signal(false);

  constructor() {
    this.initTheming();
  }

  initTheming() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    var theme = localStorage.getItem('theme');

    if (
      theme === 'dark' ||
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.darkMode.set(true);
    } else {
      this.darkMode.set(false);
    }
  }
}
