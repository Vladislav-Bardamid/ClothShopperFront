import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  animate,
  animation,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothService } from './services/clothService';
import { Dialogs } from './dialogs/dialogs';
import { Cloth } from './types/cloth';
import { CommonService } from './services/commonService';
import { delay } from 'rxjs';

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
export class AppComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private commonService: CommonService) {}

  showScrollButton = false;

  taskCount = 0;
  showSpinner = false;

  ngOnInit(): void {
    this.commonService.showSpinner.pipe(delay(0)).subscribe((value) => {
      if (value) {
        this.taskCount++;
      } else {
        this.taskCount--;
      }

      this.showSpinner = value;
    });
  }

  ngAfterViewInit(): void {}

  @HostListener('window:scroll', ['$event']) doSomething() {
    this.showScrollButton = window.scrollY > 1000;
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
