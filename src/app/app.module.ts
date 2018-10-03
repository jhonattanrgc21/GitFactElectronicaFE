import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PublicServiceComponent } from './public-service/public-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { InsuranceComponent } from './insurance/insurance.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import { PublicServiceReceiptDetailModalComponent } from './public-service/modal/public-service-receipt-detail-modal-component/public-service-receipt-detail-modal-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PublicServiceComponent,
    ToolBarComponent,
    InsuranceComponent,
    PublicServiceReceiptDetailModalComponent
  ],
  entryComponents: [PublicServiceComponent, PublicServiceReceiptDetailModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
