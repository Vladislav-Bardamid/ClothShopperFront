import {
  Component,
  Input,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  signal,
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { MenuItem } from '../sidebar.component';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css'],
  animations: [
    trigger('heightState', [
      state('true', style({ height: '*', opacity: 1 })),
      state('false', style({ height: '0', opacity: 0 })),
      transition('false => true', [
        style({ height: '0', opacity: 0 }),
        animate('300ms ease-out', style({ height: '*', opacity: 1 })),
      ]),
      transition('true => false', [
        style({ height: '*', opacity: 1 }),
        animate('300ms ease-out', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class SidebarItemComponent implements OnInit {
  @Input() item!: MenuItem;

  @ViewChild('routerLinkRef') routerLinkRef!: RouterLinkActive;

  isOpen = false;

  sidebarCollapsed = signal(false);

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit(): void {
    this.update();

    this.commonService.collapseSidebar.subscribe(() => {
      this.sidebarCollapsed.update((value) => !value);
    });

    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) return;

      this.update();
    });
  }

  update() {
    setTimeout(() => {
      this.isOpen = this.routerLinkRef.isActive;
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
