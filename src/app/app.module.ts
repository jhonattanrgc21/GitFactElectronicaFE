import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { PublicServiceComponent } from "./public-service/public-service.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { ToolBarComponent } from "./tool-bar/tool-bar.component";
import { InsertBillComponent } from "./insert-bill/insert-bill.component";
import { CreditNoteComponent } from "./credit-note/credit-note.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PublicServiceReceiptDetailModalComponent } from "./public-service/modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component";
import { MatConfirmComponent } from "./mat-confirm/mat-confirm.component";
import { InsertBillAlertDialog } from "./insert-bill/insert-bill.component";
import { CreditNoteAlertDialog } from "./credit-note/credit-note.component";
import { PDFBillDialog } from "./public-service/public-service.component";
import { ResendEmailModalComponent } from "./public-service/modal/resend-email-modal/resend-email-modal.component";

@NgModule({
  declarations: [
    AppComponent,
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
  entryComponents: [
    PublicServiceComponent,
    PublicServiceReceiptDetailModalComponent,
    InsertBillAlertDialog,
    PDFBillDialog,
    CreditNoteAlertDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
