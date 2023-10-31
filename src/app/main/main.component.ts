import { Component, OnInit, signal } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  sidebarCollapsed = signal(false);

  constructor(private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.commonService.collapseSidebar.subscribe(() => {
      this.sidebarCollapsed.mutate((value) => !value);
    });
  }
}
