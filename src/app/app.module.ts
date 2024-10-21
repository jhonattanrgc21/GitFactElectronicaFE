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
import { PDFBillDialog } from "./public-service/public-service.component";
import { MainModule } from "./main/main.module";
import { AuthService } from "./core/auth/services/auth/auth.service";
import { CreditNoteAlertDialog } from "./credit-note/credit-note-alert-dialog";
import { ConfirmationPopupComponent } from './shared/components/confirmation-popup/confirmation-popup.component';
import { InformationPopupComponent } from './insert-codop/components/information-popup/information-popup.component';

@NgModule({
  declarations: [AppComponent, ConfirmationPopupComponent, InformationPopupComponent],
  entryComponents: [
    PublicServiceComponent,
    PublicServiceReceiptDetailModalComponent,
    InsertBillAlertDialog,
    PDFBillDialog,
    CreditNoteAlertDialog,
    ConfirmationPopupComponent,
    InformationPopupComponent
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
