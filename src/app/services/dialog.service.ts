import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor() {}
  openErrorDialog(text: string): void {}
}
