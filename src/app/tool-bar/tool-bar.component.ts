import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "../core/auth/services/auth/auth.service";

@Component({
  selector: "app-tool-bar",
  templateUrl: "./tool-bar.component.html",
  styleUrls: ["./tool-bar.component.css"],
})
export class ToolBarComponent implements OnInit, OnDestroy {
  public subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = new Subscription();
  }

  public ngOnInit(): void {
    this.subscription.add(this.handleAuthLogoutSuccessSubscription());
  }

  public handleAuthLogoutSuccessSubscription(): Subscription {
    return this.authService.authLogoutSuccess$.subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(["/entry"]);
      }
    });
  }

  public signOff(): void {
    this.authService.onLogout();
  }

  public getUser(): string {
    return this.authService.getUsername();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
