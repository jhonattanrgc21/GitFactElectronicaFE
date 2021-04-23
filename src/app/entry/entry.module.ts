import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EntryComponent } from "./entry.component";
import { EntryRoutingModule } from "./entry.routing.module";
import { LoginComponent } from "./pages/login/login.component";
import { MaterialModule } from "../material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    EntryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [EntryComponent, LoginComponent],
})
export class EntryModule {}
