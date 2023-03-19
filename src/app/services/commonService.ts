import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';


@Injectable({ providedIn: 'root' })
export class CommonService {
  showSpinner = new Subject<boolean>();
  updatePriceCount = new Subject<number>();
  setPriceCount = new Subject<number>();
}
