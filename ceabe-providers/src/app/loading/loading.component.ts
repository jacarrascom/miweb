import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoadingComponent>,) {
  }

  ngOnInit() {
  }

  hide() {
    this.dialogRef.close();
  }

}
