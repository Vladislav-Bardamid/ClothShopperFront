import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  TitleStrategy,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  _title?: string;

  constructor(
    private router: Router,
    private readonly titleStrategy: TitleStrategy,
    private readonly commonService: CommonService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this._title = this.titleStrategy.buildTitle(
      this.router.routerState.snapshot
    );

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle;
          while (route.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.title) {
            routeTitle = route.snapshot.title;
          }
          return routeTitle;
        })
      )
      .subscribe((title?: string) => {
        if (title) {
          this._title = title;
        }
      });

    this.commonService.changeTitle.subscribe((title) => {
      this.title.setTitle(`${environment.title} - ${title}`);
      this._title = title;
    });
  }
}
