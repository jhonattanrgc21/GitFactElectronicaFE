import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main.routing.module";
import {
  PDFBillDialog,
  PublicServiceComponent,
} from "../public-service/public-service.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import {
  InsertBillComponent,
  InsertBillAlertDialog,
} from "../insert-bill/insert-bill.component";
import { MatConfirmComponent } from "../mat-confirm/mat-confirm.component";
import { PublicServiceReceiptDetailModalComponent } from "../public-service/modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component";
import { ToolBarComponent } from "../tool-bar/tool-bar.component";
import { MaterialModule } from "../material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResendEmailModalComponent } from "../public-service/modal/resend-email-modal/resend-email-modal.component";
import { CreditNoteComponent } from "../credit-note/credit-note.component";
import { CreditNoteAlertDialog } from "../credit-note/credit-note-alert-dialog";

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MainComponent,
    SidebarComponent,
    PublicServiceComponent,
    ToolBarComponent,
    InsertBillComponent,
    PublicServiceReceiptDetailModalComponent,
    MatConfirmComponent,
    InsertBillAlertDialog,
    PDFBillDialog,
    CreditNoteComponent,
    CreditNoteAlertDialog,
    ResendEmailModalComponent,
  ],
})
export class MainModule {}
