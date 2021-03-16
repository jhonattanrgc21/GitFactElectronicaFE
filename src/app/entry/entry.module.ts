import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EntryComponent } from "./entry.component";
import { EntryRoutingModule } from "./entry.routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { MaterialModule } from "../material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [EntryComponent, LoginComponent],
})
export class EntryModule {}
