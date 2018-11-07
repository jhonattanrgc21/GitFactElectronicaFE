import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicServiceComponent } from './public-service/public-service.component';
import { InsuranceComponent } from './insurance/insurance.component';
const routes: Routes = [
{
path: '',
component: PublicServiceComponent
},
{
  path: 'insurance',
  component: InsuranceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
