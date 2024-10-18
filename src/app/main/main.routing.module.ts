import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/auth/guards/auth.guard";
import { CreditNoteComponent } from "../credit-note/credit-note.component";
import { InsertBillComponent } from "../insert-bill/insert-bill.component";
import { ReprocessBillSComponent } from "../reprocess-bills/reprocess-bills.component";
import { PublicServiceComponent } from "../public-service/public-service.component";
import { MainComponent } from "./main.component";
import { CodopsListComponent } from "../codops-list/codops-list.component";
import { InsertCodopComponent } from "../insert-codop/insert-codop.component";

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
      {
        path: "creditNote/:id",
        component: CreditNoteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "codopsList",
        component: CodopsListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "codop-form",
        component: InsertCodopComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
