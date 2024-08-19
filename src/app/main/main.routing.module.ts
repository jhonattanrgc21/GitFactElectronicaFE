import { BillReportsComponent } from './../bill-reports/bill-reports.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/auth/guards/auth.guard";
import { CreditNoteComponent } from "../credit-note/credit-note.component";
import { InsertBillComponent } from "../insert-bill/insert-bill.component";
import { ReprocessBillSComponent } from "../reprocess-bills/reprocess-bills.component";
import { PublicServiceComponent } from "../public-service/public-service.component";
import { MainComponent } from "./main.component";
import { ReceiversListComponent } from '../receivers-list/receivers-list.component';
import { InsertReceiverComponent } from '../insert-receiver/insert-receiver.component';
import { IdentificationTypesResolver } from '../insert-receiver/resolvers/identification-types-resolver';


const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        redirectTo: "billList",
        pathMatch: "full",
        canActivate: [AuthGuard],
      },
      {
        path: "billList",
        component: PublicServiceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "billReports",
        component: BillReportsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "insurance",
        component: InsertBillComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "insertBill",
        component: InsertBillComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "reprocessBillS",
        component: ReprocessBillSComponent,
        canActivate: [AuthGuard],
      },
      //
      {
        path: "creditNote/:id",
        component: CreditNoteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "receiversList",
        component: ReceiversListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "receptor-form",
        component: InsertReceiverComponent,
        canActivate: [AuthGuard],
        resolve: {identificationtypelist: IdentificationTypesResolver}
      },
      {
        path: "receptor-form/:id",
        component: InsertReceiverComponent,
        canActivate: [AuthGuard],
        resolve: {identificationtypelist: IdentificationTypesResolver}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
