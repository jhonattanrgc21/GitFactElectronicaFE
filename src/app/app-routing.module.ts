import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicServiceComponent } from './public-service/public-service.component';
import { InsertBillComponent } from './insert-bill/insert-bill.component';
import { CreditNoteComponent } from './credit-note/credit-note.component';
const routes: Routes = [
{
path: '',
component: PublicServiceComponent
},
{
  path: 'insurance',
  component: InsertBillComponent
}
,
{
  path: 'insertBill',
  component: InsertBillComponent
}
,
{
  path: 'creditNote/:id',
  component: CreditNoteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
