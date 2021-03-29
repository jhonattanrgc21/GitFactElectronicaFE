import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./core/auth/guards/auth.guard";
import { UnAuthGuard } from "./core/auth/guards/un-auth.guard";

const routes: Routes = [
  {
    path: "entry",
    loadChildren: "./entry/entry.module#EntryModule",
    canActivate: [UnAuthGuard],
  },
  {
    path: "",
    loadChildren: "./main/main.module#MainModule",
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "entry",
    pathMatch: "full",
    canActivate: [UnAuthGuard],
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
