import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PublicServiceComponent } from "./public-service/public-service.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { PublicServiceReceiptDetailModalComponent } from "./public-service/modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component";
import { InsertBillAlertDialog } from "./insert-bill/insert-bill.component";
import { RecipientsBillAlertDialog } from "./recipients-bill/recipients-bill.component";
import { PDFBillDialog } from "./public-service/public-service.component";
import { MainModule } from "./main/main.module";
import { AuthService } from "./core/auth/services/auth/auth.service";
import { CreditNoteAlertDialog } from "./credit-note/credit-note-alert-dialog";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    PublicServiceComponent,
    PublicServiceReceiptDetailModalComponent,
    InsertBillAlertDialog,
    RecipientsBillAlertDialog,
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
    MainModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
