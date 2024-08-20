import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-edition-popup',
  templateUrl: './confirm-edition-popup.component.html',
  styleUrls: ['./confirm-edition-popup.component.css']
})
export class ConfirmEditionPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmEditionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onClose(confirm?: string): void {
		this.dialogRef.close(confirm);
	}

  onConfirm(){
    this.onClose('confirm');
  }
}
