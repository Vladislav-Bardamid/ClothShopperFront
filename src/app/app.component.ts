import { Component, HostListener, OnInit } from '@angular/core';
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  hideScrollButton = true;
  ngOnInit(): void {
    var localToken = localStorage.getItem('auth');
    if (!localToken) {
      this.route.queryParams.subscribe((params) => {
        var token = params['token'];
        if (!token) {
          this.router.navigateByUrl('auth');
        }
      });
    }
  }

  @HostListener('window:scroll', ['$event']) doSomething() {
    this.hideScrollButton = window.scrollY < 1000;
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
