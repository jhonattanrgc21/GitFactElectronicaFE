import { ReceiversListComponent } from './../receivers-list/receivers-list.component';
import { BillReportsComponent } from './../bill-reports/bill-reports.component';
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
import {
  ReprocessBillSComponent
} from "../reprocess-bills/reprocess-bills.component";
import { MatConfirmComponent } from "../mat-confirm/mat-confirm.component";
import { PublicServiceReceiptDetailModalComponent } from "../public-service/modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component";
import { ToolBarComponent } from "../tool-bar/tool-bar.component";
import { MaterialModule } from "../material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResendEmailModalComponent } from "../public-service/modal/resend-email-modal/resend-email-modal.component";
import { CreditNoteComponent } from "../credit-note/credit-note.component";
import { CreditNoteAlertDialog } from "../credit-note/credit-note-alert-dialog";
import { RejectionMessageModalComponent } from "../public-service/modal/rejection-message-modal/rejection-message-modal.component";
import { InsertReceiverComponent } from '../insert-receiver/insert-receiver.component';
import { ConfirmEditionPopupComponent } from '../receivers-list/components/confirm-edition-popup/confirm-edition-popup.component';
import { AlertPopupComponent } from '../insert-receiver/components/alert-popup/alert-popup.component';
import { IdentificationMaskDirective } from '../shared/directives/identification-mask.directive';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [IdentificationMaskDirective],
  declarations: [
    MainComponent,
    SidebarComponent,
    PublicServiceComponent,
    ToolBarComponent,
    InsertBillComponent,
    ReprocessBillSComponent,
    PublicServiceReceiptDetailModalComponent,
    MatConfirmComponent,
    InsertBillAlertDialog,
    PDFBillDialog,
    CreditNoteComponent,
    CreditNoteAlertDialog,
    ResendEmailModalComponent,
    RejectionMessageModalComponent,
    BillReportsComponent,
    ReceiversListComponent,
    InsertReceiverComponent,
    ConfirmEditionPopupComponent,
    AlertPopupComponent,
    IdentificationMaskDirective
  ],
})
export class MainModule {}
