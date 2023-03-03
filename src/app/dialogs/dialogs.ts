import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SimpleDialogComponent } from "./simple-dialog/simple-dialog.component";

@Injectable()
export class Dialogs{
    constructor(public dialog: MatDialog) {}
    openErrorDialog(text: string): void {
        this.dialog.open(SimpleDialogComponent, {
          data: {
            title: 'Error',
            text: text,
          },
        });
      }
}