import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-docente-page-dialog',
  template: `
    <div [innerHTML]="data.content"></div>
  `,
})
export class DocentePageDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}