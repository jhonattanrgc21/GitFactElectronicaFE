import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Router } from "@angular/router";
import { DialogData } from "./interfaces/dialog-data-credit-note-interface";

@Component({
  selector: "credit-note-alert-dialog",
  templateUrl: "credit-note-alert-dialog.html",
})
export class CreditNoteAlertDialog {
  constructor(
    public dialogRef: MatDialogRef<CreditNoteAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  public okClick(message): void {
    if (message == "error") {
      this.dialogRef.close();
    } else {
      this.router.navigate([""]);
      this.dialogRef.close();
    }
  }
}
