import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-common-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css'],
  animations: [
    trigger('enterLeaveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s', style({ opacity: 0.5 })),
      ]),
      transition(':leave', [animate('0.1s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CommonComponent implements OnInit {
  showScrollButton = false;

  taskCount = 0;
  showSpinner = false;

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.showSpinner.pipe(delay(0)).subscribe((value) => {
      if (value) {
        this.taskCount++;
      } else {
        this.taskCount--;
      }

      this.showSpinner = value;
    });

    this.commonService.onScroll.subscribe((value) => {
      this.showScrollButton = window.scrollY > 1000;
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0 });
  }
}
