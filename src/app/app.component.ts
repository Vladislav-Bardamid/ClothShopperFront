import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hideScrollButton = true;
  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event']) doSomething() {
    this.hideScrollButton = window.scrollY < 1000;
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
